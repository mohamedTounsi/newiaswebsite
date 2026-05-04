"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, CalendarDays, LogOut, Users, 
  Settings, Activity, ShieldCheck, ArrowRight,
  Database, Zap, Clock, Terminal, Globe
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionId, setSessionId] = useState("------");

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin");
    } else {
      setIsChecking(false);
    }
    setSessionId(Math.random().toString(16).substring(2, 8).toUpperCase());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin");
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#238155]"></div>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#238155] uppercase tracking-widest">IAS</div>
        </div>
      </div>
    );
  }

  const modules = [
    {
      title: "PAST ARCHIVES",
      desc: "Manage the legacy of industrial gatherings and historical metrics.",
      icon: CalendarDays,
      href: "/admin/past-events",
      stats: "Archive Manager",
      color: "from-green-500/20 to-transparent"
    },
    {
      title: "UPCOMING DISPATCH",
      desc: "Coordinate and schedule future technical sessions and visits.",
      icon: Calendar,
      href: "/admin/upcoming-events",
      stats: "Operations",
      color: "from-emerald-500/20 to-transparent"
    },
    {
      title: "TEAM COMMAND",
      desc: "Registry of active volunteers and leadership across all terms.",
      icon: Users,
      href: "/admin/team",
      stats: "Personnel",
      color: "from-teal-500/20 to-transparent"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#238155] selection:text-white overflow-hidden font-sans">
      {/* Intense Grain Texture */}
      <div 
        className="fixed inset-0 opacity-[0.05] pointer-events-none z-[100] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Radial Backgrounds */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#238155]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#238155]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Top Header */}
      <nav className="relative z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#238155] flex items-center justify-center rounded-none italic font-black text-xl">IAS</div>
              <div>
                <h1 className="text-[10px] font-black tracking-[0.4em] uppercase">Control Center</h1>
                <p className="text-[9px] text-[#238155] tracking-[0.2em] uppercase font-bold">Authenticated Terminal</p>
              </div>
            </div>
            <div className="hidden md:flex h-8 w-px bg-white/10 mx-2" />
            <div className="hidden md:flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#238155]" /> {currentTime.toLocaleTimeString()}</span>
                <span className="flex items-center gap-1.5"><Globe size={12} className="text-[#238155]" /> ISIMS, SFAX</span>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase hover:text-[#238155] transition-all duration-300"
          >
            <span className="hidden sm:inline opacity-40 group-hover:opacity-100">Terminate Session</span>
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[#238155] transition-colors">
                <LogOut size={16} />
            </div>
          </button>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto px-8 py-16 relative z-10">
        {/* Hero Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[#238155] animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.6em] text-[#238155] uppercase">System Operational</span>
            </div>
            <h2 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase italic mb-8">
              COMMAND<br/>
              <span className="text-transparent border-t border-b border-white/10 px-4" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>CENTER</span>
            </h2>
          </motion.div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
                { label: 'Database Status', val: 'Connected', icon: Database },
                { label: 'Cloud Uplink', val: 'Active', icon: Globe },
                { label: 'System Load', val: 'Normal', icon: Activity },
                { label: 'Encryption', val: 'AES-256', icon: ShieldCheck }
            ].map((stat, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="p-6 bg-white/[0.02] border border-white/5 hover:border-[#238155]/30 transition-colors group"
                >
                    <stat.icon size={16} className="text-[#238155] mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                    <p className="text-xs font-black tracking-widest uppercase">{stat.val}</p>
                </motion.div>
            ))}
        </div>

        {/* Modules Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {modules.map((mod, i) => (
            <Link
              key={i}
              href={mod.href}
              className="group relative h-[400px] bg-white/[0.02] border border-white/5 p-10 hover:border-[#238155]/40 transition-all duration-700 overflow-hidden flex flex-col justify-between"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              {/* Animated Corner */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-white/10 group-hover:border-[#238155] transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                   <div className="w-16 h-16 border border-white/10 flex items-center justify-center group-hover:border-[#238155] group-hover:bg-[#238155]/10 transition-all duration-500">
                        <mod.icon size={32} strokeWidth={1} className="text-white group-hover:text-[#238155] transition-colors" />
                   </div>
                   <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-white/20 tracking-widest uppercase mb-1">Module ID</span>
                        <span className="text-[10px] font-black text-[#238155] tracking-widest uppercase">IAS-00{i+1}</span>
                   </div>
                </div>
                
                <h3 className="text-4xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-4 italic italic">
                  {mod.title}
                </h3>
                
                <p className="text-white/40 text-sm font-light leading-relaxed max-w-[200px] group-hover:text-white/70 transition-colors">
                  {mod.desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-6">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{mod.stats}</span>
                <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase text-[#238155] group-hover:translate-x-2 transition-transform">
                  INITIALIZE <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Console Output Footer */}
        <div className="mt-24 bg-black/40 border border-white/5 p-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
                    <Terminal size={14} className="text-[#238155]" /> SYSTEM LOG:
                </div>
                <div className="text-[10px] font-mono text-[#238155] animate-pulse">
                    READY :: WAITING FOR COMMAND_
                </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black text-white/10 uppercase tracking-widest">
                <span>VER: 2.0.4</span>
                <span>UUID: {sessionId}</span>
            </div>
        </div>
      </main>
    </div>
  );
}
