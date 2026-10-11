"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Trophy, X, Calendar, Sparkles, ArrowUpRight } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d)
    ? dateStr
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

function AwardModal({ award, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/60 hover:bg-[#238155] text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-105"
        >
          <X size={20} />
        </button>

        <div className="md:w-1/2 aspect-video md:aspect-auto relative bg-neutral-900 min-h-[260px]">
          <img
            src={award.image_url || "/placeholder-award.jpg"}
            alt={award.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <span className="bg-[#238155] text-white text-[9px] px-3 py-1 font-black tracking-widest uppercase mb-2 inline-flex items-center gap-1.5 italic">
              <Trophy size={11} /> HONORS & RECOGNITION
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-tighter italic">
              {award.title}
            </h2>
          </div>
        </div>

        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 text-[#238155] text-[10px] font-black tracking-[0.3em] uppercase">
                <Sparkles size={14} /> Official Chapter Honor
              </div>
              {(award.date_received || award.created_at) && (
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <Calendar size={13} className="text-[#238155]" />
                  <span>
                    {award.date_received || formatDate(award.created_at)}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase block">
                Description
              </span>
              <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed whitespace-pre-line">
                {award.description || "No description provided."}
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between text-[10px] font-black text-gray-400 tracking-widest uppercase">
            <span>IEEE IAS ISIMS</span>
            <span className="text-[#238155] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#238155]" />
              Chapter Recognition
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AwardCard({ award, index, onClick }) {
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
      className="group relative w-full h-full cursor-pointer"
      onClick={() => onClick(award)}
    >
      <div
        className="relative overflow-hidden transition-all duration-400 h-full flex flex-col group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
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
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4"
            style={{
              background:
                "linear-gradient(to top, rgba(10,30,18,0.7) 0%, transparent 55%)",
            }}
          >
            <span className="text-[10px] font-black tracking-widest uppercase text-white bg-[#238155] px-3 py-1 flex items-center gap-1.5 shadow-md">
              View Award <ArrowUpRight size={12} />
            </span>
          </div>
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
              {award.date_received || "Honors & Recognition"}
            </p>
          </div>
          <h3
            className="text-[17px] leading-snug mb-3 uppercase tracking-tighter group-hover:text-[#238155] transition-colors"
            style={{ color: "#0f3d25", fontWeight: 800 }}
          >
            {award.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-3 mb-2 font-light leading-relaxed">
            {award.description}
          </p>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#238155] tracking-widest uppercase group-hover:underline flex items-center gap-1">
              Read Details &rarr;
            </span>
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
  const [selectedAward, setSelectedAward] = useState(null);

  // Fetch awards
  useEffect(() => {
    const fetchAwards = async () => {
      const { data } = await supabase
        .from("awards")
        .select("*")
        .order("created_at", { ascending: false });

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
                        <AwardCard
                          award={award}
                          index={rowIndex * cols + i}
                          onClick={setSelectedAward}
                        />
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Award Details Modal */}
        <AnimatePresence>
          {selectedAward && (
            <AwardModal
              award={selectedAward}
              onClose={() => setSelectedAward(null)}
            />
          )}
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
