"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function InnovationWaves() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-20 md:py-24 overflow-hidden flex items-center justify-center">
      {/* SCOPED BACKGROUND */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/bg.webp')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />

      {/* GREEN OVERLAY */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(35,129,85,0.9) 0%, rgba(106,170,138,0.8) 100%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-8 flex flex-col items-center">

        {/* WIDE CINEMATIC TEXT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full text-center"
        >
          <h2 className="text-white text-4xl sm:text-6xl md:text-[7vw] lg:text-[6vw] leading-[1.1] tracking-tight font-extralight w-full flex flex-col items-center justify-center">
            <span className="w-full text-center">
              BRIDGING <span className="font-serif italic font-medium text-[#bbf7d0]">ACADEMIA</span>
            </span>
            <span className="w-full text-center">
              <span className="font-serif italic font-medium text-[#bbf7d0]">&amp;</span> INDUSTRY
            </span>
          </h2>
        </motion.div>

        {/* DESCRIPTION & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 md:mt-8 flex flex-col items-center w-full"
        >
          <div className="relative group inline-block">
            {/* L corner accents for the button */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white group-hover:border-[#238155] group-hover:-top-3 group-hover:-left-3 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white group-hover:border-[#238155] group-hover:-bottom-3 group-hover:-right-3 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20" />
            
            <a
              target="_blank"
              href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMIA034"
              className="relative flex items-center justify-center gap-4 px-10 md:px-14 py-4 md:py-5 bg-white text-[#166534] hover:bg-[#bbf7d0] transition-colors duration-500 rounded-none shadow-2xl z-10"
            >
              <span className="text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase">
                Become an IAS Member
              </span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
