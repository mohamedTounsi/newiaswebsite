"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Trophy } from "lucide-react";

function AwardCard({ award, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative w-full h-full"
    >
      <div
        className="relative overflow-hidden transition-all duration-400 h-full flex flex-col"
        style={{
          background: "white",
          border: "1px solid rgba(35,129,85,0.12)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(35,129,85,0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(35,129,85,0.12)";
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10"
          style={{ background: "linear-gradient(90deg, #238155, #3ecf8e)" }}
        />

        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={award.image_url || "/placeholder-award.jpg"}
            alt={award.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              background:
                "linear-gradient(to top, rgba(10,30,18,0.65) 0%, transparent 55%)",
            }}
          />
        </div>

        <div
          className="px-5 py-5 flex-grow flex flex-col"
          style={{ borderTop: "1px solid rgba(35,129,85,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={14} style={{ color: "#238155" }} />
            <p
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "#6aaa8a", fontWeight: 600 }}
            >
              {award.date_received || "Unknown Date"}
            </p>
          </div>
          <h3
            className="text-[17px] leading-snug mb-3 uppercase tracking-tighter"
            style={{ color: "#0f3d25", fontWeight: 800 }}
          >
            {award.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-3 mb-2 font-light">
            {award.description}
          </p>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <div
              className="w-8 h-px flex-shrink-0"
              style={{ background: "#238155" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#238155" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Awards() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cols, setCols] = useState(3);

  // Fetch awards
  useEffect(() => {
    const fetchAwards = async () => {
      const { data } = await supabase
        .from("awards")
        .select("*")
        .order("date_received", { ascending: false });

      setAwards(data || []);
      setLoading(false);
    };

    fetchAwards();
  }, []);

  // Handle responsive columns
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else if (window.innerWidth < 1280) setCols(3);
      else setCols(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Split awards into rows
  const rows = [];
  for (let i = 0; i < awards.length; i += cols) {
    rows.push(awards.slice(i, i + cols));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238155]"></div>
      </div>
    );
  }

  return (
    <section
      id="awards"
      className="relative w-full overflow-hidden py-24"
      style={{
        background: "linear-gradient(160deg, #ffffff 0%, #f4faf7 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] -translate-y-1/4 translate-x-1/4 opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(35,129,85,0.08) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] translate-y-1/4 -translate-x-1/4 opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(35,129,85,0.06) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #238155 0px, #238155 1px, transparent 1px, transparent 40px)",
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#238155" }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.5em] font-medium"
                style={{ color: "#238155" }}
              >
                Honors & Achievements
              </span>
              <div
                className="flex-1 h-px max-w-[60px]"
                style={{ background: "rgba(35,129,85,0.2)" }}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="leading-[1.1]"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                fontWeight: 300,
                color: "#0f3d25",
                letterSpacing: "-0.025em",
              }}
            >
              Our{" "}
              <span style={{ fontWeight: 700, color: "#238155" }}>Awards</span>
            </motion.h2>
          </div>
        </div>

        {/* Awards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {awards.length === 0 ? (
              <div className="text-center py-20 bg-white border border-dashed border-gray-200">
                <Trophy size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-light tracking-wider uppercase text-sm">
                  No awards to display yet
                </p>
              </div>
            ) : (
              rows.map((row, rowIndex) => {
                const isLastRow = rowIndex === rows.length - 1;
                const rowCols = row.length;
                const shouldCenter = isLastRow && rowCols < cols;

                return (
                  <div
                    key={rowIndex}
                    className={`grid gap-6 sm:gap-8 ${
                      rowIndex > 0 ? "mt-6 sm:mt-8" : ""
                    } ${
                      shouldCenter
                        ? "flex justify-center"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    }`}
                    style={{
                      display: shouldCenter ? "flex" : "grid",
                      flexWrap: shouldCenter ? "wrap" : undefined,
                      justifyContent: shouldCenter ? "center" : undefined,
                    }}
                  >
                    {row.map((award, i) => (
                      <div
                        key={award.id}
                        className={shouldCenter ? "w-full" : ""}
                        style={{
                          maxWidth: shouldCenter
                            ? `calc(${100 / cols}% - 20px)`
                            : undefined,
                          minWidth: shouldCenter ? "280px" : undefined,
                        }}
                      >
                        <AwardCard award={award} index={rowIndex * cols + i} />
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-16 h-px origin-left"
          style={{
            background: "linear-gradient(90deg, #238155, rgba(35,129,85,0.1))",
          }}
        />
      </div>
    </section>
  );
}
