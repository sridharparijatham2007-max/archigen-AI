import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { InputForm } from "./components/InputForm";
import { DesignResult } from "./components/DesignResult";
import { LoginPage } from "./components/LoginPage";
import { ChatBot } from "./components/ChatBot";
import { generateDesign, type ArchitecturalDesign } from "./services/gemini";
import { AlertCircle, RefreshCcw, LogOut } from "lucide-react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [design, setDesign] = useState<ArchitecturalDesign | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("archigen_auth");
    if (savedAuth) {
      setIsAuthenticated(true);
      setUserEmail(savedAuth);
    }
  }, []);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem("archigen_auth", email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem("archigen_auth");
    setDesign(null);
  };

  const handleGenerate = async (inputs: {
    siteConditions: string;
    regulations: string;
    clientRequirements: string;
    include3D: boolean;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateDesign(inputs);
      setDesign(result);
      // Scroll to result
      setTimeout(() => {
        window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Failed to generate design. Please check your inputs and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setDesign(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen blueprint-grid selection:bg-accent selection:text-white">
      <div className="relative">
        <Header onOpenChat={() => setIsChatOpen(true)} />
        <button 
          onClick={handleLogout}
          className="absolute top-6 right-8 hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
        >
          <LogOut className="w-3 h-3" />
          Logout ({userEmail})
        </button>
      </div>
      
      <main className="relative">
        {!design && (
          <div className="py-12">
            <div className="max-w-4xl mx-auto px-6 mb-12 text-center space-y-4">
              <h2 className="text-5xl font-serif italic tracking-tight">Design the Future</h2>
              <p className="text-sm text-ink/60 max-w-xl mx-auto">
                Enter your site parameters, regulatory constraints, and client vision. 
                Our AI-driven synthesis engine will generate optimized architectural solutions.
              </p>
            </div>
            <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto px-6 py-8">
            <div className="bg-red-50 border border-red-200 p-4 flex items-center gap-3 text-red-800 rounded-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {design && (
          <div className="relative">
            <div className="sticky top-24 z-40 flex justify-center -mb-6">
              <button 
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-line/10 shadow-xl text-[10px] font-mono uppercase tracking-widest hover:bg-ink hover:text-bg transition-all"
              >
                <RefreshCcw className="w-3 h-3" />
                New Analysis
              </button>
            </div>
            <DesignResult design={design} />
          </div>
        )}
      </main>

      <ChatBot currentDesign={design} isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      <footer className="py-12 px-8 border-t border-line/5 text-center">
        <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.4em]">
          © 2026 Archigen AI Systems • Generative Architectural Synthesis
        </p>
      </footer>
    </div>
  );
}
