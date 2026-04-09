import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ArchitecturalDesign {
  designOverview: {
    concept: string;
    layoutSummary: string;
  };
  threeDDesign: {
    spatialOrganization: string;
    keyFeatures: string;
    massingBlocks: {
      position: [number, number, number];
      args: [number, number, number];
      color: string;
      label: string;
    }[];
  };
  structuralRecommendations: {
    materials: string[];
    constructionSystem: string;
  };
  sustainabilityFeatures: {
    energyStrategies: string[];
    environmentalImpact: string;
  };
  costEstimate: {
    breakdown: { item: string; amount: string }[];
  };
  complianceCheck: {
    regulationsSatisfied: string[];
  };
  alternativeDesigns: {
    name: string;
    description: string;
    tradeOffs: string;
  }[];
  finalRecommendation: {
    option: string;
    justification: string;
  };
  renderImageUrl?: string;
}

export async function generateDesign(inputs: {
  siteConditions: string;
  regulations: string;
  clientRequirements: string;
  include3D: boolean;
}): Promise<ArchitecturalDesign> {
  // Step 1: Generate structured design data
  const dataPrompt = `
    Generate an optimized architectural building design based on the following inputs:
    
    SITE CONDITIONS:
    ${inputs.siteConditions}
    
    REGULATIONS:
    ${inputs.regulations}
    
    CLIENT REQUIREMENTS:
    ${inputs.clientRequirements}
    
    Ensure the solution is optimized for cost, sustainability, safety, and usability.
    
    ${inputs.include3D ? `
    IMPORTANT: You must also provide a 3D massing model representation. 
    This should be a list of 'massingBlocks' (cuboids).
    Each block needs:
    - position: [x, y, z] (use a standard coordinate system where y is up)
    - args: [width, height, depth]
    - color: hex color string (use architectural colors like #ffffff, #e5e5e5, #404040, or wood/glass tones)
    - label: what this block represents (e.g., "Main Living Area", "Service Core", "Roof Garden")
    
    Keep the coordinates relative to the center (0,0,0).
    ` : 'Do not generate 3D massing blocks for this request.'}
    
    Provide the results in a structured JSON format.
  `;

  const dataResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: dataPrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          designOverview: {
            type: Type.OBJECT,
            properties: {
              concept: { type: Type.STRING },
              layoutSummary: { type: Type.STRING },
            },
            required: ["concept", "layoutSummary"],
          },
          threeDDesign: {
            type: Type.OBJECT,
            properties: {
              spatialOrganization: { type: Type.STRING },
              keyFeatures: { type: Type.STRING },
              massingBlocks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    position: { type: Type.ARRAY, items: { type: Type.NUMBER }, minItems: 3, maxItems: 3 },
                    args: { type: Type.ARRAY, items: { type: Type.NUMBER }, minItems: 3, maxItems: 3 },
                    color: { type: Type.STRING },
                    label: { type: Type.STRING },
                  },
                  required: ["position", "args", "color", "label"],
                },
              },
            },
            required: ["spatialOrganization", "keyFeatures", "massingBlocks"],
          },
          structuralRecommendations: {
            type: Type.OBJECT,
            properties: {
              materials: { type: Type.ARRAY, items: { type: Type.STRING } },
              constructionSystem: { type: Type.STRING },
            },
            required: ["materials", "constructionSystem"],
          },
          sustainabilityFeatures: {
            type: Type.OBJECT,
            properties: {
              energyStrategies: { type: Type.ARRAY, items: { type: Type.STRING } },
              environmentalImpact: { type: Type.STRING },
            },
            required: ["energyStrategies", "environmentalImpact"],
          },
          costEstimate: {
            type: Type.OBJECT,
            properties: {
              breakdown: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    item: { type: Type.STRING },
                    amount: { type: Type.STRING },
                  },
                  required: ["item", "amount"],
                },
              },
            },
            required: ["breakdown"],
          },
          complianceCheck: {
            type: Type.OBJECT,
            properties: {
              regulationsSatisfied: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["regulationsSatisfied"],
          },
          alternativeDesigns: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                tradeOffs: { type: Type.STRING },
              },
              required: ["name", "description", "tradeOffs"],
            },
          },
          finalRecommendation: {
            type: Type.OBJECT,
            properties: {
              option: { type: Type.STRING },
              justification: { type: Type.STRING },
            },
            required: ["option", "justification"],
          },
        },
        required: [
          "designOverview",
          "threeDDesign",
          "structuralRecommendations",
          "sustainabilityFeatures",
          "costEstimate",
          "complianceCheck",
          "alternativeDesigns",
          "finalRecommendation",
        ],
      },
    },
  });

  const designData: ArchitecturalDesign = JSON.parse(dataResponse.text);

  // Step 2: Generate a photorealistic 3D render image
  if (inputs.include3D) {
    try {
      const imagePrompt = `A photorealistic high-end architectural 3D render of a building. 
      Concept: ${designData.designOverview.concept}. 
      Site: ${inputs.siteConditions}. 
      The style should be modern, clean, and professional. 
      Cinematic lighting, high detail, 8k resolution, architectural photography style.`;

      const imageResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [{ text: imagePrompt }],
      });

      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          designData.renderImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    } catch (error) {
      console.error("Image generation failed:", error);
      // Continue without image if generation fails
    }
  }

  return designData;
}
