"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageBanner from "../components/PageBanner";
import { Info, Cpu, Network, FlaskConical, Target, Eye, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const offerings = [
  {
    icon: Cpu,
    label: "Technical Workshops",
    desc: "Hands-on sessions and real-world engineering exposure.",
  },
  {
    icon: Network,
    label: "Industry Network",
    desc: "Bridges to professionals, companies, and IEEE global collaborations.",
  },
  {
    icon: FlaskConical,
    label: "Innovation Programs",
    desc: "Competitions, conferences, and research that push boundaries.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <PageBanner 
        title="ABOUT US" 
        description="Pioneering industrial innovation and fostering technical excellence since our inception." 
        Icon={Info} 
      />

      {/* ── SECTION 1: WHO WE ARE ── */}
      <section className="relative py-24 overflow-hidden bg-white border-b border-[#238155]/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            <div className="flex-1 order-2 lg:order-1">
              <motion.div {...fadeUp(0)} className="flex items-center gap-4 mb-10">
                <div className="w-8 h-[2px] bg-[#238155]" />
                <span className="text-[10px] md:text-xs tracking-[0.4em] font-bold text-[#238155] uppercase">
                  Discovery
                </span>
                <div className="flex-1 h-[1px] bg-[#238155]/10" />
              </motion.div>
              
              <motion.h2 
                {...fadeUp(0.1)}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f3d25] mb-8 leading-none tracking-tighter uppercase"
              >
                Who Are <span className="text-transparent" style={{ WebkitTextStroke: '2px #238155' }}>We?</span>
              </motion.h2>
              
              <motion.p 
                {...fadeUp(0.2)}
                className="text-sm md:text-base text-[#6aaa8a] font-bold leading-[1.8] mb-12 max-w-2xl"
              >
                Our IEEE IAS ISIMS chapter is committed to upholding the principles of industry and technology — providing members with an enriching journey through workshops, conferences, competitions, and global collaborations. We equip future leaders with the skills and connections they need to excel.
              </motion.p>

              <div className="grid sm:grid-cols-3 gap-6">
                {offerings.map((item, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp(0.3 + i * 0.1)}
                    className="p-5 md:p-8 bg-white border border-[#238155]/20 hover:-translate-y-1 transition-all duration-300 flex items-center md:block group relative"
                  >
                    {/* L Corner Accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#238155] opacity-0 group-hover:opacity-100 group-hover:-top-2 group-hover:-left-2 transition-all duration-300" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#238155] opacity-0 group-hover:opacity-100 group-hover:-bottom-2 group-hover:-right-2 transition-all duration-300" />

                    <div className="flex-shrink-0 w-12 h-12 bg-[#238155]/5 border border-[#238155]/20 flex items-center justify-center mr-4 md:mr-0 md:mb-6 group-hover:bg-[#238155]/10 transition-all text-[#238155]">
                      <item.icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#0f3d25] mb-1 md:mb-2">{item.label}</h3>
                      <p className="text-xs text-[#6aaa8a] font-bold break-all sm:break-normal">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              {...fadeUp(0.4)}
              className="lg:w-2/5 order-1 lg:order-2 w-full flex justify-center"
            >
              <div className="relative group w-full max-w-[450px]">
                {/* L Corner framing for the logo */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#238155] transition-all duration-700 group-hover:-top-4 group-hover:-left-4 z-20" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#238155] transition-all duration-700 group-hover:-bottom-4 group-hover:-right-4 z-20" />
                
                <div className="relative aspect-square bg-[#f8faf9] flex items-center justify-center overflow-hidden border border-[#238155]/20 p-8 shadow-xl">
                  <div className="absolute inset-0 bg-[#238155]/5 opacity-40" />
                  <Image 
                    src="/logoiasjdid.png" 
                    alt="IEEE IAS Logo" 
                    width={400} 
                    height={400} 
                    className="object-contain relative z-10 w-full h-auto group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: VALUES (With bg.webp) ── */}
      <section className="relative py-24 overflow-hidden border-b border-[#238155]/10">
        
        {/* BACKGROUND IMAGE (bg.webp) */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bg.webp" 
            alt="Background"
            fill
            className="object-cover opacity-15 grayscale"
            priority
          />
          {/* Overlay to ensure it stays light and readable */}
          <div className="absolute inset-0 bg-white/80" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-16">
            <div className="max-w-xl text-center md:text-left w-full md:w-auto">
              <motion.div {...fadeUp(0)} className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <div className="w-8 h-[2px] bg-[#238155] hidden md:block" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#238155] font-bold">Our Values</span>
                <div className="w-8 h-[2px] bg-[#238155] md:hidden" />
              </motion.div>
              <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-5xl font-black text-[#0f3d25] uppercase tracking-tighter">
                Strategic <span className="text-transparent" style={{ WebkitTextStroke: '2px #238155' }}>Foundation</span>
              </motion.h2>
            </div>
            <div className="h-[2px] flex-1 bg-[#238155]/20 hidden md:block" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "MISSION", desc: "Upholding industry principles and bridging excellence.", icon: Target },
              { title: "VISION", desc: "Leading the industrial transition in technology.", icon: Eye },
              { title: "ETHICS", desc: "Operating with transparency and moral integrity.", icon: ShieldCheck },
            ].map((v, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="group flex flex-row md:flex-col items-center md:items-start gap-6 bg-white border border-[#238155]/20 p-6 md:p-10 hover:-translate-y-1 transition-all duration-300 shadow-lg relative"
              >
                {/* L Corners */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#238155] opacity-0 group-hover:opacity-100 group-hover:-top-2 group-hover:-right-2 transition-all duration-300" />
                
                <div className="flex-shrink-0 w-16 h-16 bg-[#238155]/5 border border-[#238155]/20 flex items-center justify-center text-[#238155] group-hover:bg-[#238155] group-hover:text-white transition-all duration-500">
                  <v.icon size={28} strokeWidth={1.5} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm md:text-lg font-black text-[#0f3d25] tracking-[0.2em] uppercase mb-1 md:mb-3">{v.title}</h3>
                  <p className="text-xs text-[#6aaa8a] font-bold leading-relaxed">{v.desc}</p>
                </div>

                {/* Decorative Line on desktop */}
                <div className="hidden md:block w-12 h-[2px] bg-[#238155]/50 mt-4 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
