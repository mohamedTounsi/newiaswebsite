"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageBanner from "../components/PageBanner";
import Team from "../components/Team";
import { Users } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />

      {/* Background Texture */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #238155 0px, #238155 1px, transparent 1px, transparent 40px)",
          }}
        />
      </div>
      
      <div className="relative z-10">
        <PageBanner 
          title="OUR TEAM" 
          description="Meet the visionaries and leaders behind the IEEE IAS ISIMS Student Branch Chapter." 
          Icon={Users} 
        />

        <Team />
      </div>

      <Footer />
    </div>
  );
}
