"use client";

import { motion } from "framer-motion";
import { Cpu, Network, FlaskConical, ArrowUpRight } from "lucide-react";
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

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #fafdfb 100%)",
      }}
    >
      {/* ── Radial bloom top-right ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-[700px] h-[700px] -translate-y-1/3 translate-x-1/4"
        style={{
          background:
            "radial-gradient(circle, rgba(35,129,85,0.07) 0%, transparent 65%)",
        }}
      />
      {/* ── Radial bloom bottom-left ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] translate-y-1/3 -translate-x-1/4"
        style={{
          background:
            "radial-gradient(circle, rgba(35,129,85,0.05) 0%, transparent 65%)",
        }}
      />
      
      {/* Background Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #238155 0px, #238155 1px, transparent 1px, transparent 40px)",
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 py-24">
        {/* ── Eyebrow ── */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-4 mb-14">
          <p
            className="text-[10px] uppercase tracking-[0.5em] font-medium"
            style={{ color: "#238155" }}
          >
            About Us
          </p>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(35,129,85,0.15)" }}
          />
        </motion.div>

        {/* ══════════════════════════════════════════
            MAIN ROW: Left text | Right logo
        ══════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-20 mb-16">
          {/* ── LEFT: all text content ── */}
          <div className="flex-1 min-w-0">
            {/* Chapter label */}
            <motion.div
              {...fadeUp(0.05)}
              className="flex items-center gap-2 mb-6"
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#238155" }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.4em] font-medium"
                style={{ color: "#6aaa8a" }}
              >
                IEEE IAS ISIMS SBC
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              {...fadeUp(0.1)}
              className="mb-6"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#0f3d25",
              }}
            >
              Who Are
              <span style={{ fontWeight: 600, color: "#238155" }}> We?</span>
            </motion.h2>

            {/* Body */}
            <motion.p
              {...fadeUp(0.15)}
              className="text-[15px] leading-[1.85] mb-8"
              style={{ color: "#4a7a60", fontWeight: 300, maxWidth: "58ch" }}
            >
              Our IEEE IAS ISIMS chapter is committed to upholding the
              principles of industry and technology — providing members with an
              enriching journey through workshops, conferences, competitions,
              and global collaborations. We equip future leaders with the skills
              and connections they need to excel and make a real difference.
            </motion.p>

            {/* CTA */}
            <motion.a
              {...fadeUp(0.2)}
              href="/about"
              className="group inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.35em] font-medium transition-all duration-300"
              style={{ color: "#238155" }}
            >
              Learn More
              <span
                className="block h-px transition-all duration-500 group-hover:w-10 w-6"
                style={{ backgroundColor: "#238155" }}
              />
              <ArrowUpRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>

            {/* ── Offerings: horizontal row ── */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {offerings.map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.25 + i * 0.08)}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex flex-col gap-3 p-5 rounded-2xl"
                  style={{
                    background: "white",
                    border: "1px solid rgba(35,129,85,0.1)",
                    boxShadow: "0 2px 16px rgba(35,129,85,0.06)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(35,129,85,0.07)",
                      border: "1px solid rgba(35,129,85,0.12)",
                    }}
                  >
                    <item.icon
                      size={17}
                      strokeWidth={1.6}
                      style={{ color: "#238155" }}
                    />
                  </div>

                  {/* Title */}
                  <p
                    className="text-[13px] font-semibold leading-tight"
                    style={{ color: "#1a5e3a" }}
                  >
                    {item.label}
                  </p>

                  {/* Desc: hidden on mobile */}
                  <p
                    className="hidden sm:block text-[12px] font-light leading-relaxed"
                    style={{ color: "#7ab89a" }}
                  >
                    {item.desc}
                  </p>

                  {/* Bottom line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 24 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                    className="h-px mt-auto"
                    style={{ background: "#238155", opacity: 0.5 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Logo panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            className="flex-shrink-0 flex justify-center lg:justify-end"
          >
            {/* Outer decorative ring */}
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-[2.5rem]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(35,129,85,0.08) 0%, transparent 70%)",
                  border: "1px solid rgba(35,129,85,0.1)",
                }}
              />

              {/* Card */}
              <div
                className="relative flex items-center justify-center rounded-[2rem] overflow-hidden"
                style={{
                  width: 300,
                  height: 300,
                  background: "white",
                  border: "1px solid rgba(35,129,85,0.12)",
                  boxShadow:
                    "0 8px 60px rgba(35,129,85,0.1), 0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {/* Soft inner glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(35,129,85,0.06) 0%, transparent 70%)",
                  }}
                />

                {/* Corner ticks */}
                {[
                  {
                    top: 16,
                    left: 16,
                    borderWidth: "2px 0 0 2px",
                    borderRadius: "3px 0 0 0",
                  },
                  {
                    top: 16,
                    right: 16,
                    borderWidth: "2px 2px 0 0",
                    borderRadius: "0 3px 0 0",
                  },
                  {
                    bottom: 16,
                    left: 16,
                    borderWidth: "0 0 2px 2px",
                    borderRadius: "0 0 0 3px",
                  },
                  {
                    bottom: 16,
                    right: 16,
                    borderWidth: "0 2px 2px 0",
                    borderRadius: "0 0 3px 0",
                  },
                ].map((style, i) => (
                  <span
                    key={i}
                    className="absolute w-5 h-5"
                    style={{
                      ...style,
                      borderStyle: "solid",
                      borderColor: "rgba(35,129,85,0.35)",
                    }}
                  />
                ))}

                <motion.div
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Image
                    src="/logoiasjdid.png"
                    alt="IEEE IAS ISIMS SBC"
                    width={220}
                    height={220}
                    className="object-contain relative z-10"
                    style={{
                      filter: "drop-shadow(0 4px 20px rgba(35,129,85,0.2))",
                    }}
                  />
                </motion.div>
              </div>

              {/* Floating label below */}
              <motion.div
                {...fadeUp(0.35)}
                className="mt-5 flex flex-col items-center gap-1"
              >
                <p
                  className="text-[9px] uppercase tracking-[0.45em] font-medium"
                  style={{ color: "#6aaa8a" }}
                >
                  IEEE
                </p>
                <p
                  className="text-[13px] font-light tracking-widest"
                  style={{ color: "#1a6a48" }}
                >
                  IAS ISIMS SBC
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
