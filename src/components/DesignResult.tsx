import type { ReactNode } from "react";
import { motion } from "motion/react";
import { 
  Info, 
  Box, 
  Layers, 
  Leaf, 
  DollarSign, 
  CheckCircle, 
  GitBranch, 
  Award,
  ArrowRight,
  Maximize2
} from "lucide-react";
import type { ArchitecturalDesign } from "@/src/services/gemini";
import { BuildingModel } from "./BuildingModel";

interface DesignResultProps {
  design: ArchitecturalDesign;
}

export function DesignResult({ design }: DesignResultProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto py-12 px-6 space-y-12"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-ink pl-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-serif italic tracking-tight">{design.designOverview.concept}</h2>
          <p className="text-sm text-ink/60 max-w-2xl">{design.designOverview.layoutSummary}</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest opacity-40">
          <Maximize2 className="w-3 h-3" />
          <span>Interactive 3D Viewport</span>
        </div>
      </div>

      {/* 3D Model Viewport */}
      {(design.threeDDesign.massingBlocks.length > 0 || design.renderImageUrl) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {design.threeDDesign.massingBlocks.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest opacity-40">
                  <Maximize2 className="w-3 h-3" />
                  <span>Interactive 3D Massing</span>
                </div>
                <div className="px-2 py-0.5 bg-ink/5 text-[9px] font-mono uppercase tracking-tighter opacity-40">
                  Technical View
                </div>
              </div>
              <BuildingModel blocks={design.threeDDesign.massingBlocks} />
            </motion.div>
          )}

          {design.renderImageUrl && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest opacity-40">
                  <Maximize2 className="w-3 h-3" />
                  <span>Photorealistic 3D Render</span>
                </div>
                <div className="px-2 py-0.5 bg-accent/10 text-accent text-[9px] font-mono uppercase tracking-tighter">
                  Visual Concept
                </div>
              </div>
              <div className="w-full h-[500px] technical-border overflow-hidden bg-ink/5 group relative">
                <img 
                  src={design.renderImageUrl} 
                  alt="Architectural Render" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 3D Design Description */}
        <Section 
          icon={<Box className="w-5 h-5" />} 
          title="Spatial Organization" 
          number="01"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">{design.threeDDesign.spatialOrganization}</p>
            <div className="pt-4 border-t border-line/10">
              <h4 className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-2">Key Architectural Features</h4>
              <p className="text-sm italic">{design.threeDDesign.keyFeatures}</p>
            </div>
          </div>
        </Section>

        {/* Structural Recommendations */}
        <Section 
          icon={<Layers className="w-5 h-5" />} 
          title="Structural System" 
          number="02"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">{design.structuralRecommendations.constructionSystem}</p>
            <div className="flex flex-wrap gap-2">
              {design.structuralRecommendations.materials.map((material, i) => (
                <span key={i} className="px-3 py-1 bg-ink/5 text-[10px] font-mono uppercase tracking-wider">
                  {material}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* Sustainability Features */}
        <Section 
          icon={<Leaf className="w-5 h-5" />} 
          title="Sustainability" 
          number="03"
        >
          <div className="space-y-4">
            <ul className="space-y-2">
              {design.sustainabilityFeatures.energyStrategies.map((strategy, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <ArrowRight className="w-3 h-3 mt-1 shrink-0 opacity-40" />
                  {strategy}
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink/60 border-t border-line/10 pt-4">
              {design.sustainabilityFeatures.environmentalImpact}
            </p>
          </div>
        </Section>

        {/* Cost Estimate */}
        <Section 
          icon={<DollarSign className="w-5 h-5" />} 
          title="Cost Estimate" 
          number="04"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              {design.costEstimate.breakdown.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-line/5 pb-1">
                  <span className="opacity-60">{item.item}</span>
                  <span className="font-mono font-medium">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Compliance Check */}
        <Section 
          icon={<CheckCircle className="w-5 h-5" />} 
          title="Compliance" 
          number="05"
        >
          <div className="flex flex-wrap gap-2">
            {design.complianceCheck.regulationsSatisfied.map((reg, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-800 text-[11px] font-medium rounded-sm border border-green-100">
                <CheckCircle className="w-3 h-3" />
                {reg}
              </div>
            ))}
          </div>
        </Section>

        {/* Alternative Designs */}
        <Section 
          icon={<GitBranch className="w-5 h-5" />} 
          title="Alternatives" 
          number="06"
        >
          <div className="space-y-6">
            {design.alternativeDesigns.map((alt, i) => (
              <div key={i} className="space-y-2">
                <h4 className="text-sm font-bold">{alt.name}</h4>
                <p className="text-xs opacity-70">{alt.description}</p>
                <div className="text-[10px] font-mono uppercase tracking-wider text-accent">
                  Trade-offs: {alt.tradeOffs}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Final Recommendation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-ink text-bg p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Award className="w-32 h-32" />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-50">Final Recommendation</span>
            <div className="h-[1px] flex-1 bg-bg/20" />
          </div>
          <h3 className="text-3xl font-serif italic">{design.finalRecommendation.option}</h3>
          <p className="text-sm leading-relaxed opacity-80 max-w-3xl">
            {design.finalRecommendation.justification}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Section({ icon, title, number, children }: { icon: ReactNode, title: string, number: string, children: ReactNode }) {
  return (
    <div className="technical-card group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-ink/5 group-hover:bg-ink group-hover:text-bg transition-colors">
            {icon}
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest">{title}</h3>
        </div>
        <span className="text-[10px] font-mono opacity-30">{number}</span>
      </div>
      {children}
    </div>
  );
}
