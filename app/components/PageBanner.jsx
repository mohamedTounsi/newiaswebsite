"use client";

import { motion } from "framer-motion";

export default function PageBanner({ title, description, Icon }) {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
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
            "linear-gradient(135deg, rgba(35,129,85,0.85) 0%, rgba(106,170,138,0.75) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between gap-12">
          <div className="flex items-stretch gap-8 max-w-2xl">
            {/* Softened Vertical Accent Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="w-[2px] bg-white/40 rounded-full hidden md:block"
            />
            
            <div className="flex flex-col justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-light text-white mb-3 tracking-[0.08em] uppercase"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
              >
                {title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm md:text-base text-white/80 font-light max-w-xl leading-relaxed tracking-wide"
              >
                {description}
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block text-white drop-shadow-2xl"
          >
            {Icon && <Icon size={120} strokeWidth={0.75} />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
