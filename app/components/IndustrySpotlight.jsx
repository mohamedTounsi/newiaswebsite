"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const spotlights = [
  {
    type: "industry",
    name: "STMicroelectronics",
    role: "Strategic Partner",
    description: "Providing internships and mentorship to our members since 2021",
    icon: Briefcase,
  },
  {
    type: "alumni",
    name: "Sara Ben Salem",
    role: "Class of 2022",
    description: "Now R&D Engineer at Siemens, leading automation projects",
    icon: GraduationCap,
  },
  {
    type: "industry",
    name: "Vermeg",
    role: "Innovation Partner",
    description: "Collaborating on fintech and AI research projects",
    icon: Briefcase,
  },
];

export default function IndustrySpotlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-[#f5faf7]">
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
            Success Stories
          </span>
          <h2 
            className="text-2xl md:text-3xl font-light mt-2"
            style={{ color: "#238155" }}
          >
            Industry & Alumni Spotlight
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {spotlights.map((spotlight, index) => (
            <motion.div
              key={spotlight.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border"
              style={{ borderColor: "rgba(35,129,85,0.1)" }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(35,129,85,0.1)" }}
              >
                <spotlight.icon className="w-6 h-6" style={{ color: "#238155" }} />
              </div>
              <h3 
                className="text-lg font-light mb-1"
                style={{ color: "#238155" }}
              >
                {spotlight.name}
              </h3>
              <p 
                className="text-xs uppercase tracking-wider mb-3 font-light"
                style={{ color: "#6aaa8a" }}
              >
                {spotlight.role}
              </p>
              <p 
                className="text-sm font-light leading-relaxed"
                style={{ color: "#6aaa8a" }}
              >
                {spotlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}