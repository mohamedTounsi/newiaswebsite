"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiInstagramLine,
  RiFacebookLine,
  RiLinkedinLine,
  RiMailLine,
} from "react-icons/ri";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const socialIcons = {
  instagram: RiInstagramLine,
  facebook: RiFacebookLine,
  linkedin: RiLinkedinLine,
  email: RiMailLine,
};

function SocialBtn({ href, platform }) {
  const Icon = socialIcons[platform];
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(35,129,85,0.2)",
        color: "#238155",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#238155";
        e.currentTarget.style.color = "white";
        e.currentTarget.style.borderColor = "#238155";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.92)";
        e.currentTarget.style.color = "#238155";
        e.currentTarget.style.borderColor = "rgba(35,129,85,0.2)";
      }}
    >
      <Icon size={13} />
    </a>
  );
}

function TeamCard({ member, index }) {
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

        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={member.image_url || "/placeholder-team.jpg"}
            alt={`${member.first_name} ${member.last_name}`}
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

          <div className="absolute bottom-3 left-3 flex gap-1.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350">
            {member.instagram_url && (
              <SocialBtn href={member.instagram_url} platform="instagram" />
            )}
            {member.facebook_url && (
              <SocialBtn href={member.facebook_url} platform="facebook" />
            )}
            {member.linkedin_url && (
              <SocialBtn href={member.linkedin_url} platform="linkedin" />
            )}
            {member.email_url && (
              <SocialBtn href={member.email_url} platform="email" />
            )}
          </div>
        </div>

        <div
          className="px-4 py-4 flex-grow flex flex-col"
          style={{ borderTop: "1px solid rgba(35,129,85,0.08)" }}
        >
          <h3
            className="text-[15px] leading-snug mb-1.5"
            style={{ color: "#0f3d25", fontWeight: 300 }}
          >
            {member.first_name}{" "}
            <span style={{ fontWeight: 600 }}>{member.last_name}</span>
          </h3>

          <div className="flex items-center gap-2 mt-auto">
            <div
              className="w-5 h-px flex-shrink-0"
              style={{ background: "#238155" }}
            />
            <p
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "#6aaa8a", fontWeight: 500 }}
            >
              {member.position}
            </p>
          </div>

          <div
            className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "#238155" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cols, setCols] = useState(3);

  // Fetch years
  useEffect(() => {
    const fetchYears = async () => {
      const { data } = await supabase
        .from("years")
        .select("*")
        .order("year", { ascending: false });

      if (data && data.length > 0) {
        setYears(data);
        setSelectedYear(data[0]);
      }
      setLoading(false);
    };

    fetchYears();
  }, []);

  // Fetch members for selected year
  useEffect(() => {
    if (!selectedYear) return;

    const fetchMembers = async () => {
      const { data } = await supabase
        .from("team_members")
        .select("*")
        .eq("year_id", selectedYear.id)
        .order("display_order", { ascending: true });

      setMembers(data || []);
    };

    fetchMembers();
  }, [selectedYear]);

  // Handle responsive columns
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCols(2);
      else if (window.innerWidth < 1280) setCols(3);
      else setCols(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Split members into rows
  const rows = [];
  for (let i = 0; i < members.length; i += cols) {
    rows.push(members.slice(i, i + cols));
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
      id="team"
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
                Leadership Team
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
              Meet the{" "}
              <span style={{ fontWeight: 700, color: "#238155" }}>Team</span>
            </motion.h2>
          </div>

          {/* Year switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2"
          >
            {years.map((year) => (
              <button
                key={year.id}
                onClick={() => setSelectedYear(year)}
                className="relative px-6 py-2.5 text-sm font-medium tracking-widest uppercase transition-all duration-300 overflow-hidden"
                style={{
                  background:
                    selectedYear?.id === year.id ? "#238155" : "transparent",
                  color: selectedYear?.id === year.id ? "white" : "#238155",
                  border: "1px solid",
                  borderColor:
                    selectedYear?.id === year.id
                      ? "#238155"
                      : "rgba(35,129,85,0.3)",
                  letterSpacing: "0.15em",
                }}
              >
                {year.year}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Team Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {members.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500">
                  No team members found for {selectedYear?.year}
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
                    className={`grid gap-4 sm:gap-5 ${
                      rowIndex > 0 ? "mt-4 sm:mt-5" : ""
                    } ${
                      shouldCenter
                        ? "flex justify-center"
                        : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    }`}
                    style={{
                      display: shouldCenter ? "flex" : "grid",
                      flexWrap: shouldCenter ? "wrap" : undefined,
                      justifyContent: shouldCenter ? "center" : undefined,
                    }}
                  >
                    {row.map((member, i) => (
                      <div
                        key={member.id}
                        className={shouldCenter ? "w-full" : ""}
                        style={{
                          maxWidth: shouldCenter
                            ? `calc(${100 / cols}% - 20px)`
                            : undefined,
                          minWidth: shouldCenter ? "200px" : undefined,
                        }}
                      >
                        <TeamCard member={member} index={rowIndex * cols + i} />
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
