"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageBanner from "../components/PageBanner";
import Contact from "../components/Contact";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <PageBanner 
        title="CONTACT US" 
        description="Have a question or want to collaborate? Reach out to our team and let's build the future together." 
        Icon={Mail} 
      />

      <Contact />

      <Footer />
    </div>
  );
}
