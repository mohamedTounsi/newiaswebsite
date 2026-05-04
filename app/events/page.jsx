"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageBanner from "../components/PageBanner";
import { Calendar, History, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EventsLanding() {
  const selections = [
    {
      title: "UPCOMING",
      subtitle: "FUTURE EVENTS",
      desc: "Be the first to know about our next workshops, industrial visits, and technical sessions.",
      href: "/events/upcoming",
      icon: Calendar,
      accent: "#238155",
    },
    {
      title: "PREVIOUS",
      subtitle: "OUR HISTORY",
      desc: "Explore our history of excellence through past conferences, competitions, and gatherings.",
      href: "/events/previous",
      icon: History,
      accent: "#0a0a0a",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <PageBanner 
        title="OUR EVENTS" 
        description="Select a category to explore our professional gatherings and industrial activities." 
        Icon={Calendar} 
      />

      <section className="flex flex-col md:flex-row min-h-[100vh] md:min-h-[70vh] md:h-[70vh] bg-white border-t border-[#238155]/10">
        {selections.map((item, i) => (
          <Link 
            key={i} 
            href={item.href}
            className="group relative flex-1 flex flex-col items-center justify-center p-8 md:p-12 transition-all duration-700 md:hover:flex-[1.5] border-b md:border-b-0 md:border-r border-[#238155]/10 last:border-b-0 last:border-r-0 overflow-hidden min-h-[50vh] md:min-h-0"
          >
            {/* Subtle Gradient Background Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ background: `radial-gradient(circle at center, ${item.accent}, transparent 70%)` }}
            />

            {/* Hover Accent Glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle at center, ${item.accent}, transparent 70%)` }}
            />

            <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="mb-6 md:mb-8"
                style={{ color: item.accent }}
              >
                <item.icon size={80} strokeWidth={1} className="md:w-[120px] md:h-[120px] transition-transform duration-700 group-hover:scale-110" />
              </motion.div>

              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-[10px] tracking-[0.4em] md:tracking-[0.6em] text-[#6aaa8a] font-bold uppercase mb-2"
              >
                {item.subtitle}
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f3d25] tracking-tighter uppercase mb-4 md:mb-6"
              >
                {item.title}
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-xs text-[#6aaa8a] font-bold leading-relaxed tracking-wide mb-8 md:mb-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500"
              >
                {item.desc}
              </motion.p>

              <motion.div 
                className="flex items-center gap-4 text-[#238155] text-[10px] tracking-[0.4em] font-bold uppercase border border-[#238155]/20 px-6 md:px-8 py-3 group-hover:bg-[#238155] group-hover:text-white group-hover:border-[#238155] transition-all duration-300 shadow-md shadow-[#238155]/5"
              >
                Explore <ArrowRight size={14} />
              </motion.div>
            </div>

            {/* L-Corners in all 4 corners (Sharp Green Aesthetic) */}
            <div className="absolute top-4 left-4 md:top-10 md:left-10 w-6 h-6 md:w-10 md:h-10 border-t-2 border-l-2 border-[#238155]/20 group-hover:border-[#238155] transition-colors duration-500" />
            <div className="absolute top-4 right-4 md:top-10 md:right-10 w-6 h-6 md:w-10 md:h-10 border-t-2 border-r-2 border-[#238155]/20 group-hover:border-[#238155] transition-colors duration-500" />
            <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 w-6 h-6 md:w-10 md:h-10 border-b-2 border-l-2 border-[#238155]/20 group-hover:border-[#238155] transition-colors duration-500" />
            <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-6 h-6 md:w-10 md:h-10 border-b-2 border-r-2 border-[#238155]/20 group-hover:border-[#238155] transition-colors duration-500" />
          </Link>
        ))}
      </section>

      <Footer />
    </div>
  );
}
