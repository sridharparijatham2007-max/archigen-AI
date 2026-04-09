import { useState, type FormEvent } from "react";
import { Mail, Lock, LogIn, ShieldAlert } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simple mock validation
    if (email && password.length >= 6) {
      onLogin(email);
    } else {
      setError("Please enter a valid email and a password with at least 6 characters.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center blueprint-grid p-6">
      <div className="technical-card max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-ink text-bg rounded-sm mb-4">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif italic tracking-tight">System Access</h2>
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">
            Archigen AI Authorization Required
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest opacity-60 flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-ink/5 border border-line/10 focus:border-accent outline-none transition-colors text-sm font-sans"
                placeholder="architect@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest opacity-60 flex items-center gap-2">
                <Lock className="w-3 h-3" />
                Security Key
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-ink/5 border border-line/10 focus:border-accent outline-none transition-colors text-sm font-sans"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-[11px] font-mono uppercase tracking-wider bg-red-50 p-3 border border-red-100">
              <ShieldAlert className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-ink text-bg font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent transition-colors flex items-center justify-center gap-2"
          >
            Authenticate
          </button>
        </form>

        <div className="pt-6 border-t border-line/5 text-center">
          <p className="text-[9px] font-mono opacity-30 uppercase leading-relaxed">
            Unauthorized access is strictly prohibited. <br />
            All system interactions are logged for compliance.
          </p>
        </div>
      </div>
    </div>
  );
}
