"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  "Power Electronics", "Industrial IoT", "Renewable Energy",
  "Automation", "AI in Industry", "Smart Grids"
];

export default function TechRadar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span 
            className="text-xs uppercase tracking-[0.2em] font-light"
            style={{ color: "#238155" }}
          >
            Our Expertise
          </span>
          <h2 
            className="text-2xl md:text-3xl font-light mt-2"
            style={{ color: "#238155" }}
          >
            Tech Radar
          </h2>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-64 h-64 rounded-full border-2 border-dashed"
              style={{ borderColor: "rgba(35,129,85,0.2)" }}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10 py-12">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.05, duration: 0.4, type: "spring" }}
                className="text-center p-4"
              >
                <div 
                  className="w-2 h-2 rounded-full mx-auto mb-3"
                  style={{ backgroundColor: "#238155" }}
                />
                <p 
                  className="text-sm font-light tracking-wide"
                  style={{ color: "#6aaa8a" }}
                >
                  {tech}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}