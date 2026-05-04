"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  const [headerHeight, setHeaderHeight] = useState(90);
  const [bgImage, setBgImage] = useState("hero1.JPG");
  const socials = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/profile.php?id=61572324778458",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/ieee_ias_isims/", // change this
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/company/ieee-ias-isims-sbc/", // change this
    },
  ];

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) setHeaderHeight(header.offsetHeight);
  }, []);

  useEffect(() => {
    const updateImage = () => {
      setBgImage(window.innerWidth < 768 ? "hero2.JPG" : "hero1.JPG");
    };
    updateImage();
    window.addEventListener("resize", updateImage);
    return () => window.removeEventListener("resize", updateImage);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="relative"
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/${bgImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10" />

          {/* Keep your green but softer */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(106,170,138,0.08), transparent)",
            }}
          />
        </div>

        {/* TOP LEFT TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-6 left-6 z-30"
        >
          <p className="text-white text-[10px] tracking-[0.35em] font-light uppercase">
            IEEE IAS ISIMS SBC
          </p>

          <div
            className="mt-2 w-10 h-[1px]"
            style={{ backgroundColor: "#6aaa8a" }}
          />
        </motion.div>

        {/* LEFT VERTICAL TEXT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8 }}
          className="hidden md:flex absolute left-6 bottom-10 z-30"
        >
          <span
            className="text-[10px] tracking-[0.4em] font-extralight uppercase"
            style={{
              color: "#6aaa8a",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            Industry • Innovation • Power
          </span>
        </motion.div>

        {/* SOCIAL ICONS */}
        <div className="absolute z-30 flex flex-col gap-4 right-4 sm:right-6 md:right-8 top-6 md:top-1/2 md:-translate-y-1/2">
          {socials.map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.1,
              }}
              whileHover={{
                scale: 1.15,
                x: -4,
              }}
              className="group flex items-center justify-center 
    w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 
    rounded-full border transition-all duration-300"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(8px)",
                borderColor: "rgba(106,170,138,0.25)",
              }}
            >
              <Icon
                className="w-4 h-4 md:w-5 md:h-5 transition-all duration-300"
                style={{ color: "#6aaa8a" }}
              />

              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                  boxShadow: "0 0 15px rgba(106,170,138,0.4)",
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span
            className="font-extralight uppercase"
            style={{
              fontSize: "8px",
              letterSpacing: "0.22em",
              color: "#6aaa8a",
            }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-px h-7"
            style={{
              background: "linear-gradient(to bottom, #6aaa8a, transparent)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
