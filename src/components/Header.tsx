import { Ruler, HelpCircle } from "lucide-react";

interface HeaderProps {
  onOpenChat: () => void;
}

export function Header({ onOpenChat }: HeaderProps) {
  return (
    <header className="border-b border-line/10 py-6 px-8 flex justify-between items-center bg-white/30 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-ink text-bg flex items-center justify-center rounded-sm">
          <Ruler className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase">Archigen AI</h1>
          <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Architectural Generation System v1.0</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-8 text-[11px] font-mono uppercase tracking-wider opacity-60">
        <span>Site Analysis</span>
        <span>Regulation Check</span>
        <span>Design Synthesis</span>
        <button 
          onClick={onOpenChat}
          className="flex items-center gap-2 px-3 py-1.5 bg-ink text-bg rounded-sm hover:bg-accent transition-colors"
        >
          <HelpCircle className="w-3 h-3" />
          Assistant
        </button>
      </div>
    </header>
  );
}
