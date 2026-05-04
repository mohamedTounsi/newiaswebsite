// Stats component (Stats.jsx) - with reduced padding to better fit
"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Trophy, TrendingUp } from "lucide-react";

const stats = [
  {
    value: "120+",
    label: "Active Members",
    icon: Users,
    iconColor: "#238155",
  },
  {
    value: "25+",
    label: "Events Organized",
    icon: Calendar,
    iconColor: "#238155",
  },
  {
    value: "8",
    label: "Awards Won",
    icon: Trophy,
    iconColor: "#238155",
  },
  {
    value: "5+",
    label: "Years of Impact",
    icon: TrendingUp,
    iconColor: "#238155",
  },
];

export default function Stats() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-2xl shadow-2xl"
        style={{
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(35,129,85,0.15)",
          boxShadow: "0 20px 35px -15px rgba(35,129,85,0.2)",
        }}
      >
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center justify-center py-6 md:py-8 px-4 border-r last:border-r-0 transition-all duration-300 hover:bg-[rgba(35,129,85,0.02]"
            style={{ borderColor: "rgba(35,129,85,0.1)" }}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{
                delay: i * 0.1 + 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="mb-2 md:mb-3"
            >
              <item.icon
                size={24}
                strokeWidth={1.5}
                style={{ color: item.iconColor }}
              />
            </motion.div>

            {/* Value */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="text-xl md:text-2xl font-light tracking-wide"
              style={{ color: "#1a6a48" }}
            >
              {item.value}
            </motion.h3>

            {/* Label */}
            <p
              className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-extralight mt-1.5 text-center"
              style={{ color: "#6aaa8a" }}
            >
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
