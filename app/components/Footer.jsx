"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

/* ===== FOOTER LINKS ===== */
const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebook,
    href: "https://www.facebook.com/profile.php?id=61572324778458",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/ieee_ias_isims/",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/company/ieee-ias-isims-sbc/",
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 bg-white border-t border-[#238155]/20 overflow-hidden">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(35,129,85,0.05),_transparent_50%)] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-4"
          >
            <div className="mb-6 flex items-center gap-4">
              <img
                src="/logoiasjdid.png"
                alt="IEEE ISIMS SB Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-xs font-bold text-[#6aaa8a] leading-relaxed uppercase tracking-[0.2em] max-w-sm">
              IEEE Industry Applications Society
              <br />
              ISIMS Student Branch
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h5 className="text-[10px] uppercase tracking-[0.3em] font-black mb-6 text-[#238155] border-b border-[#238155]/20 pb-3 inline-block">
              System Links
            </h5>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Team", href: "/team" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-xs font-bold text-[#0f3d25] hover:text-[#238155] transition-colors duration-300 uppercase tracking-widest"
                  >
                    <span className="w-1 h-1 bg-[#238155] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Other Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h5 className="text-[10px] uppercase tracking-[0.3em] font-black mb-6 text-[#238155] border-b border-[#238155]/20 pb-3 inline-block">
              Resources
            </h5>
            <ul className="space-y-4">
              {[
                { name: "Events", href: "/events" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-xs font-bold text-[#0f3d25] hover:text-[#238155] transition-colors duration-300 uppercase tracking-widest"
                  >
                    <span className="w-1 h-1 bg-[#238155] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-4"
          >
            <h5 className="text-[10px] uppercase tracking-[0.3em] font-black mb-6 text-[#238155] border-b border-[#238155]/20 pb-3 inline-block">
              Terminal Connect
            </h5>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-8 h-8 bg-[#238155]/5 border border-[#238155]/20 flex items-center justify-center group-hover:bg-[#238155]/10 transition-colors">
                  <MdPhone className="w-3.5 h-3.5 text-[#238155]" />
                </div>
                <p className="text-xs font-bold text-[#0f3d25] uppercase tracking-widest group-hover:text-[#238155] transition-colors">
                  +216 28 170 771
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-8 h-8 bg-[#238155]/5 border border-[#238155]/20 flex items-center justify-center group-hover:bg-[#238155]/10 transition-colors">
                  <MdEmail className="w-3.5 h-3.5 text-[#238155]" />
                </div>
                <p className="text-xs font-bold text-[#0f3d25] uppercase tracking-widest group-hover:text-[#238155] transition-colors">
                  ieee.ias.isims@ieee.org
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-8 h-8 bg-[#238155]/5 border border-[#238155]/20 flex items-center justify-center group-hover:bg-[#238155]/10 transition-colors">
                  <MdLocationOn className="w-3.5 h-3.5 text-[#238155]" />
                </div>
                <p className="text-xs font-bold text-[#0f3d25] uppercase tracking-widest group-hover:text-[#238155] transition-colors">
                  Sfax, rue Tunis klm 11
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#238155]/20 my-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold text-[#6aaa8a] uppercase tracking-[0.2em] text-center md:text-left">
              © {new Date().getFullYear()} IEEE ISIMS SB. <br className="md:hidden" /> All systems operational.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#238155]/5 border border-[#238155]/20 flex items-center justify-center hover:bg-[#238155] hover:border-[#238155] hover:-translate-y-1 transition-all duration-300 text-[#238155] hover:text-white"
                  title={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-[10px] font-bold text-[#6aaa8a] hover:text-[#238155] transition-colors duration-300 uppercase tracking-[0.2em]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[10px] font-bold text-[#6aaa8a] hover:text-[#238155] transition-colors duration-300 uppercase tracking-[0.2em]"
              >
                Terms of Use
              </Link>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="text-center pt-4 border-t border-[#238155]/10 mt-2">
            <p className="text-[10px] font-bold text-[#6aaa8a] uppercase tracking-widest">
              Developed by{" "}
              <a
                href="https://portfoliomt-kohl.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#238155] hover:text-[#1a6a48] underline underline-offset-4 decoration-[#238155]/40 hover:decoration-[#238155] transition-all"
              >
                Mohamed Tounsi
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
