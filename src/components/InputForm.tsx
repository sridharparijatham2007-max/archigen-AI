import { useState, type FormEvent } from "react";
import { MapPin, ShieldCheck, UserCircle, Sparkles, Loader2, Box } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface InputFormProps {
  onSubmit: (inputs: {
    siteConditions: string;
    regulations: string;
    clientRequirements: string;
    include3D: boolean;
  }) => void;
  isLoading: boolean;
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [siteConditions, setSiteConditions] = useState("");
  const [regulations, setRegulations] = useState("");
  const [clientRequirements, setClientRequirements] = useState("");
  const [include3D, setInclude3D] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ siteConditions, regulations, clientRequirements, include3D });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Site Conditions */}
        <div className="technical-card space-y-4">
          <div className="flex items-center gap-2 text-ink/60">
            <MapPin className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-widest">01. Site Conditions</span>
          </div>
          <textarea
            required
            placeholder="Location, climate, terrain, sunlight, wind, soil..."
            className="w-full h-40 bg-transparent border-none focus:ring-0 resize-none font-sans text-sm placeholder:italic placeholder:opacity-30"
            value={siteConditions}
            onChange={(e) => setSiteConditions(e.target.value)}
          />
        </div>

        {/* Regulations */}
        <div className="technical-card space-y-4">
          <div className="flex items-center gap-2 text-ink/60">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-widest">02. Regulations</span>
          </div>
          <textarea
            required
            placeholder="Zoning laws, building codes, safety standards..."
            className="w-full h-40 bg-transparent border-none focus:ring-0 resize-none font-sans text-sm placeholder:italic placeholder:opacity-30"
            value={regulations}
            onChange={(e) => setRegulations(e.target.value)}
          />
        </div>

        {/* Client Requirements */}
        <div className="technical-card space-y-4">
          <div className="flex items-center gap-2 text-ink/60">
            <UserCircle className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-widest">03. Client Requirements</span>
          </div>
          <textarea
            required
            placeholder="Building type, budget, timeline, design preferences..."
            className="w-full h-40 bg-transparent border-none focus:ring-0 resize-none font-sans text-sm placeholder:italic placeholder:opacity-30"
            value={clientRequirements}
            onChange={(e) => setClientRequirements(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 pt-4">
        <div className="flex items-center gap-4 p-4 bg-white/40 technical-border rounded-sm">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-sm transition-colors",
              include3D ? "bg-ink text-bg" : "bg-ink/5 text-ink/40"
            )}>
              <Box className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Advanced 3D Synthesis</span>
              <span className="text-[9px] font-mono opacity-50 uppercase">Generate massing model & visual render</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setInclude3D(!include3D)}
            className={cn(
              "relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none",
              include3D ? "bg-accent" : "bg-ink/20"
            )}
          >
            <div className={cn(
              "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out",
              include3D ? "translate-x-6" : "translate-x-0"
            )} />
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "group relative px-12 py-4 bg-ink text-bg font-mono text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:pr-16 disabled:opacity-50 disabled:cursor-not-allowed",
            isLoading && "pr-16"
          )}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Synthesizing Design...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Design
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </div>
    </form>
  );
}
