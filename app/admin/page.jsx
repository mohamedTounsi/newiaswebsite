"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Terminal, Activity, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Get password from environment variables
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate system check
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem("isAdmin", "true");
        router.push("/admin/dashboard");
      } else {
        setError("AUTHENTICATION_FAILED: ACCESS_DENIED");
        setPassword("");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white selection:bg-[#238155] selection:text-white overflow-hidden relative">
      {/* Background Effects */}
      <div 
        className="fixed inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#238155]/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-1"
      >
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-10 relative overflow-hidden">
            {/* Terminal Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#238155]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10" />
            
            <div className="flex flex-col items-center mb-12">
                <div className="w-16 h-16 bg-[#238155] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(35,129,85,0.4)]">
                    <ShieldCheck size={32} />
                </div>
                <h2 className="text-sm font-black tracking-[0.5em] uppercase italic mb-2">Secure Terminal</h2>
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-white/10" />
                    <p className="text-[9px] text-white/40 tracking-[0.2em] uppercase font-bold">Authentication Required</p>
                    <div className="h-px w-8 bg-white/10" />
                </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#238155]">
                        <Lock size={16} />
                    </div>
                    <input
                        type="password"
                        placeholder="ENTER ACCESS KEY"
                        className="w-full bg-white/5 border border-white/10 p-5 pl-12 text-xs font-black tracking-[0.3em] uppercase focus:outline-none focus:border-[#238155] focus:bg-white/10 transition-all placeholder:text-white/20"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        disabled={loading}
                    />
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div 
                            key="login-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3"
                        >
                            <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />
                            <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button 
                    disabled={loading}
                    className="w-full bg-[#238155] text-white py-5 text-[10px] font-black tracking-[0.5em] uppercase hover:bg-white hover:text-black transition-all duration-500 relative overflow-hidden group"
                >
                    <span className="relative z-10">{loading ? "VALIDATING..." : "AUTHORIZE ACCESS"}</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between opacity-30">
                <div className="flex items-center gap-2 text-[8px] font-black tracking-widest uppercase">
                    <Terminal size={12} /> SYS_v4.2
                </div>
                <div className="flex items-center gap-2 text-[8px] font-black tracking-widest uppercase">
                    <Activity size={12} /> ENCRYPTED
                </div>
            </div>
        </div>
      </motion.div>

      {/* Subtle Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-8 flex justify-between items-center opacity-20 pointer-events-none">
          <span className="text-[10px] font-black tracking-widest uppercase">IEEE IAS ISIMS SBC</span>
          <span className="text-[10px] font-black tracking-widest uppercase italic">Command Center V2.0</span>
      </div>
    </div>
  );
}
