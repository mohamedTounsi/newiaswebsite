"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Calendar, Award, Zap, TrendingUp, Activity } from "lucide-react";

export default function IndustryPulse() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const stats = [
    { icon: Users, value: 100, label: "Active Members", suffix: "+" },
    { icon: Calendar, value: 7, label: "Events per Year", suffix: "+" },
    { icon: TrendingUp, value: 2, label: "Years of Impact", suffix: "" },
    { icon: Zap, value: 5, label: "Industrial Visits", suffix: "" },
  ];

  return (
    <section ref={ref} className="relative py-12 md:py-16 overflow-hidden">
      {/* SCOPED BACKGROUND */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/bg.webp')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed", // Keeps the parallax effect safely
        }}
      />

      {/* GREEN OVERLAY */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(35,129,85,0.85) 0%, rgba(106,170,138,0.75) 100%)",
        }}
      />

      {/* DARK RADIAL OVERLAY */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col xl:flex-row items-center gap-12 xl:gap-20">
        
        {/* Left Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center xl:text-left flex-shrink-0 xl:w-1/3 text-white"
        >
          <div className="flex items-center justify-center xl:justify-start gap-3 mb-4 opacity-90">
             <Activity size={16} />
             <span className="text-xs uppercase tracking-[0.3em] font-medium">Our Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide leading-tight mb-4">
            IAS ISIMS<br className="hidden xl:block" />
            <span className="font-light">IN NUMBERS</span>
          </h2>
          <p className="text-white/80 text-sm font-light tracking-wide leading-relaxed max-w-md mx-auto xl:mx-0">
            Quantifiable metrics demonstrating our continuous commitment to industrial excellence.
          </p>
        </motion.div>

        {/* Right Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-6 flex-1 w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-black/40 backdrop-blur-sm border border-white/10 p-6 md:p-8 hover:-translate-y-1 hover:bg-black/60 hover:border-[#238155]/50 transition-all duration-300 flex flex-col items-center xl:items-start text-center xl:text-left shadow-2xl overflow-hidden"
            >
              {/* Corner accent (L shape) */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#238155] group-hover:w-12 group-hover:h-12 transition-all duration-500" />
              
              <stat.icon className="w-8 h-8 text-[#238155] mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              
              <div className="flex items-baseline gap-1 mb-2">
                  <motion.span
                    className="text-4xl md:text-5xl font-black text-white tracking-tight"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring" }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-xl md:text-2xl font-black text-[#238155]">{stat.suffix}</span>
              </div>
              
              <div className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-white/60 group-hover:text-white/90 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
