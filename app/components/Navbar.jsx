"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/* ===== HEADER ITEMS ===== */
const headerItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Awards", href: "/awards" },
  { name: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef(null);
  const topBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Dynamically update header height
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        setHeaderHeight(headerRect.bottom);
      }
    };

    updateHeaderHeight();
    window.addEventListener("scroll", updateHeaderHeight);
    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      window.removeEventListener("scroll", updateHeaderHeight);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [scrolled]);

  const handleClick = (item) => {
    setIsMobileMenuOpen(false);
    if (item.href) {
      router.push(item.href);
    }
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <div
        ref={topBarRef}
        className="w-full text-white text-xs"
        style={{ backgroundColor: "#238155" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-2 flex flex-wrap justify-center md:justify-end gap-6 md:gap-10">
          {[
            { label: "IEEE.org", href: "https://www.ieee.org/" },
            { label: "IEEE IAS.org", href: "https://ias.ieee.org/" },
            { label: "IEEE ISIMS SB", href: "https://isims.ieee.tn/" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`tracking-widest uppercase transition-opacity duration-200 hover:opacity-60 font-extralight`}
              style={{ fontSize: "10px", letterSpacing: "0.12em" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header
        ref={headerRef}
        className="h-[80px] flex items-center sticky top-0 z-40 transition-all duration-300 border-b"
        style={{
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(12px)",
          borderColor: scrolled ? "rgba(35,129,85,0.3)" : "rgba(35,129,85,0.15)",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.02)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 w-full flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={handleLogoClick}
          >
            <img
              src="/logoiasjdid.png"
              alt="IEEE ISIMS SB Logo"
              className="h-10 w-auto object-contain"
            />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <nav className="flex items-center gap-8 xl:gap-10">
              {headerItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.05,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    onClick={() => handleClick(item)}
                    className={`relative text-[13px] uppercase tracking-[0.2em] font-light transition-all duration-300 group cursor-pointer ${pathname === item.href ? "text-[#238155] !font-bold" : "text-gray-500 hover:text-[#238155]"
                      }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1.5px] transition-all duration-500 ${pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      style={{ backgroundColor: "#238155" }}
                    />
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* CTA Button */}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScs88ljHROjeA1s6cPe4hDa0hVTnay3an3cITlOUn8OFuAARw/viewform" target="_blank" rel="noopener noreferrer">
              <motion.button
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative overflow-hidden text-white text-[11px] uppercase tracking-[0.2em] font-light px-8 py-3 rounded-none border border-[#238155] transition-all duration-300 cursor-pointer group"
                style={{ backgroundColor: "#238155" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#238155";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#238155";
                  e.currentTarget.style.color = "white";
                }}
              >
                Join OUR SBC
              </motion.button>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-sm cursor-pointer transition-opacity duration-200 hover:opacity-50"
            aria-label="Toggle menu"
            style={{ color: "#238155" }}
          >
            <div className="flex flex-col gap-[5px] w-6">
              <motion.span
                animate={
                  isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px w-full"
                style={{ backgroundColor: "#238155" }}
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { opacity: 0, x: -8 }
                    : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px w-full"
                style={{ backgroundColor: "#238155" }}
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px w-full"
                style={{ backgroundColor: "#238155" }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-30 cursor-pointer"
              style={{
                backgroundColor: "rgba(0,0,0,0.15)",
                top: `${headerHeight}px`,
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed left-0 right-0 z-40 bg-white"
              style={{
                top: `${headerHeight}px`,
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.08), 0 1px 0 rgba(35,129,85,0.06)",
              }}
            >
              <div className="px-6 py-8 flex flex-col gap-0">
                {headerItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{
                      delay: index * 0.04,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      onClick={() => handleClick(item)}
                      className="w-full text-left py-4 text-[13px] uppercase tracking-[0.2em] font-light border-b transition-all duration-200 cursor-pointer"
                      style={{
                        color: pathname === item.href ? "#238155" : "#6aaa8a",
                        borderColor: "rgba(35,129,85,0.07)",
                      }}
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}

                {/* Join Button */}
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScs88ljHROjeA1s6cPe4hDa0hVTnay3an3cITlOUn8OFuAARw/viewform" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      delay: headerItems.length * 0.04 + 0.05,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-6 w-full text-white text-xs uppercase tracking-widest font-light py-3.5 cursor-pointer transition-all duration-300"
                    style={{
                      backgroundColor: "#238155",
                      letterSpacing: "0.14em",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1a5e3d")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#238155")
                    }
                  >
                    JOIN OUR SBC
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
