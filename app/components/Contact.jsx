"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+216 28 170 771",
  },
  {
    icon: Mail,
    title: "Email",
    details: "ieee.ias.isims@ieee.org",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Sfax, rue Tunis km 11",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden py-16 sm:py-24 bg-white border-t border-[#238155]/10"
    >
      {/* BACKGROUND ACCENT */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(35,129,85,0.03),_transparent_70%)] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-4 mb-8">
          <div className="w-8 h-[2px] bg-[#238155]" />
          <span className="text-[10px] md:text-xs tracking-[0.4em] font-bold text-[#238155] uppercase">
            Initiate Contact
          </span>
          <div className="flex-1 h-[1px] bg-[#238155]/10" />
        </motion.div>

        {/* HEADING */}
        <motion.h2
          {...fadeUp(0.06)}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1] mb-12 text-[#0f3d25]"
        >
          Get In <span className="text-transparent" style={{ WebkitTextStroke: '2px #238155' }}>Touch</span>
        </motion.h2>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {contactInfo.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.1 + i * 0.1)}
              className="group relative bg-white border border-[#238155]/20 p-5 md:p-8 hover:-translate-y-1 transition-all duration-300 flex items-center md:block"
            >
              {/* L Corner Accents */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#238155] opacity-0 group-hover:opacity-100 group-hover:-top-2 group-hover:-left-2 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#238155] opacity-0 group-hover:opacity-100 group-hover:-bottom-2 group-hover:-right-2 transition-all duration-300" />

              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-[#238155]/5 border border-[#238155]/20 flex items-center justify-center mr-4 md:mr-0 md:mb-6 group-hover:bg-[#238155]/10 transition-colors duration-300">
                <item.icon size={20} className="text-[#238155]" strokeWidth={1.5} />
              </div>

              {/* Text */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-[#6aaa8a] mb-1 md:mb-2">
                  {item.title}
                </p>
                <p className="text-xs sm:text-sm md:text-base font-bold text-[#0f3d25] break-all sm:break-normal">
                  {item.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FORM + MAP GRID */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* FORM */}
          <motion.div
            {...fadeUp(0.2)}
            className="bg-white border border-[#238155]/20 p-8 md:p-10 relative group"
          >
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#238155]/20 group-hover:border-[#238155]/50 transition-colors duration-300" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-[#238155]/5 border border-[#238155]/20 flex items-center justify-center">
                <Send size={16} className="text-[#238155]" />
              </div>
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0f3d25]">
                Transmit Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: "Name", name: "name", type: "text", placeholder: "Your Name" },
                  { label: "Email", name: "email", type: "email", placeholder: "Your Email" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-[#6aaa8a] mb-2">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      value={formData[f.name]}
                      onChange={handleChange}
                      required
                      placeholder={f.placeholder}
                      className="w-full bg-[#f8faf9] border border-[#238155]/20 px-4 py-3 text-sm text-[#0f3d25] focus:border-[#238155] focus:ring-1 focus:ring-[#238155] transition-all outline-none placeholder:text-[#6aaa8a]/50"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-[#6aaa8a] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="w-full bg-[#f8faf9] border border-[#238155]/20 px-4 py-3 text-sm text-[#0f3d25] focus:border-[#238155] focus:ring-1 focus:ring-[#238155] transition-all outline-none placeholder:text-[#6aaa8a]/50"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-[#6aaa8a] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message here..."
                  className="w-full bg-[#f8faf9] border border-[#238155]/20 px-4 py-3 text-sm text-[#0f3d25] focus:border-[#238155] focus:ring-1 focus:ring-[#238155] transition-all outline-none resize-none placeholder:text-[#6aaa8a]/50"
                />
              </div>

              <div className="relative group/btn inline-block mt-2 w-full md:w-auto">
                {/* L corner accents for the button */}
                <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[#238155] group-hover/btn:-top-3 group-hover/btn:-left-3 transition-all duration-300 opacity-0 group-hover/btn:opacity-100 z-20" />
                <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-[#238155] group-hover/btn:-bottom-3 group-hover/btn:-right-3 transition-all duration-300 opacity-0 group-hover/btn:opacity-100 z-20" />
                
                <button
                  type="submit"
                  className="relative w-full md:w-auto px-10 py-4 flex items-center justify-center gap-3 bg-[#238155] text-white hover:bg-[#1a6a48] transition-colors duration-300 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs z-10 shadow-lg shadow-[#238155]/20"
                >
                  {sent ? (
                    "Message Sent ✓"
                  ) : (
                    <>
                      <Send size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* MAP */}
          <motion.div
            {...fadeUp(0.3)}
            className="bg-white border border-[#238155]/20 flex flex-col relative group p-2"
          >
            {/* Map header */}
            <div className="flex items-center gap-4 px-6 py-6 border-b border-[#238155]/10 mb-2">
              <div className="w-10 h-10 bg-[#238155]/5 border border-[#238155]/20 flex items-center justify-center">
                <MapPin size={16} className="text-[#238155]" />
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0f3d25]">
                  Our Location
                </h3>
                <p className="text-[10px] text-[#6aaa8a] mt-1 font-bold">
                  ISIMS, Pôle Technologique de Sfax
                </p>
              </div>
            </div>

            {/* Map embed */}
            <div className="flex-1 min-h-[300px] lg:min-h-0 relative border border-[#238155]/10">
              <iframe
                title="ISIMS Location"
                src="https://maps.google.com/maps?q=34.83882,10.75725&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "100%", display: "block", position: "absolute", inset: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
