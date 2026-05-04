"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Users, Mic, Code,
  Globe, Trophy, Coffee, ArrowUpRight, ExternalLink,
  Play, Heart, X, Sparkles, Eye, Share2, History
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { supabase } from "@/lib/supabase";

// Helper: Get Icon based on category
const getEventIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "conference": return <Globe className="w-3 h-3 sm:w-4 sm:h-4" />;
    case "workshop": return <Mic className="w-3 h-3 sm:w-4 sm:h-4" />;
    case "bootcamp": return <Code className="w-3 h-3 sm:w-4 sm:h-4" />;
    case "competition": return <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />;
    case "hackathon": return <Coffee className="w-3 h-3 sm:w-4 sm:h-4" />;
    case "anniversary": return <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />;
    case "celebration": return <Heart className="w-3 h-3 sm:w-4 sm:h-4" />;
    default: return <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />;
  }
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return isNaN(d) ? dateStr : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

// ── COMPONENTS ──

function HeroFeaturedEvent({ event, onOpenModal }) {
  if (!event) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[70vh] min-h-[500px] sm:h-screen sm:max-h-[800px] sm:min-h-[600px] group cursor-pointer overflow-hidden"
      onClick={() => onOpenModal(event)}
    >
      <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      
      <div className="absolute top-8 left-8 z-10 flex gap-4">
        <div className="bg-black/50 backdrop-blur-sm px-4 py-2">
          <div className="text-white/50 text-[10px] tracking-wider font-bold uppercase">Attendees</div>
          <div className="text-white text-xl font-black">{event.attendees || "0"}+</div>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-10 flex items-center gap-6">
        {event.website_url && (
          <a 
            href={event.website_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 bg-black/40 hover:bg-[#6aaa8a] text-white px-4 py-2 transition-all backdrop-blur-sm border border-white/10" 
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] font-black tracking-widest uppercase">Official Site</span>
            <ExternalLink size={14} />
          </a>
        )}
        {event.featured_icon_url && (
          <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center drop-shadow-2xl">
            <img src={event.featured_icon_url} alt={`${event.title} Icon`} className="w-full h-full object-contain drop-shadow-lg" />
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16 z-10">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#238155] text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase italic">FEATURED EVENT</span>
            <span className="text-white/60 text-xs tracking-wider flex items-center gap-1">
              {getEventIcon(event.category)} {event.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-black text-white leading-none tracking-tighter mb-6 uppercase italic">
            {event.title}
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed line-clamp-3">
            {event.description}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><MapPin size={16} className="text-[#238155]" />{event.location}</span>
            <span className="flex items-center gap-2"><Calendar size={16} className="text-[#238155]" />{formatDate(event.date)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MassiveEventCard({ event, index, onClick, isEven }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`group cursor-pointer w-full mb-1 flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} relative overflow-hidden bg-white/95 backdrop-blur-sm shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500`}
      onClick={() => onClick(event)}
    >
      <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#238155] z-20" />
      <div className="lg:w-1/2 aspect-video overflow-hidden relative">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        <div className="absolute top-4 left-4">
          <span className="bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest px-3 py-1.5 flex items-center gap-1 uppercase">
            {getEventIcon(event.category)} {event.category}
          </span>
        </div>
      </div>
      <div className={`lg:w-1/2 p-10 flex flex-col justify-center`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-black text-[#238155] tracking-widest">#{String(index + 1).padStart(2, '0')}</span>
          <div className="h-px w-10 bg-gray-100" />
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{formatDate(event.date)}</span>
        </div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-none uppercase tracking-tighter mb-6 group-hover:text-[#238155] transition-colors italic">
          {event.title}
        </h3>
        <p className="text-gray-500 text-sm lg:text-base leading-relaxed mb-10 line-clamp-3">
          {event.description}
        </p>
        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          <span className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            <MapPin size={14} className="text-[#238155]" /> {event.location}
          </span>
          <div className="flex items-center gap-2 text-[10px] font-black text-[#238155] tracking-[0.2em] uppercase">
            DETAILS <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CompactEventCard({ event, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-gray-100"
      onClick={() => onClick(event)}
    >
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#238155] z-20" />
      <div className="relative w-full aspect-video overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute top-2 left-2">
          <span className="bg-black/70 backdrop-blur-sm text-white text-[8px] font-bold tracking-widest px-2 py-1 uppercase flex items-center gap-1">
            {getEventIcon(event.category)} {event.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-sm font-black text-gray-900 leading-tight mb-2 uppercase tracking-tight group-hover:text-[#238155] transition-colors">
          {event.title}
        </h4>
        <div className="flex items-center justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest">
          <span>{formatDate(event.date)}</span>
          <ArrowUpRight size={12} className="text-[#238155]" />
        </div>
      </div>
    </motion.div>
  );
}

function EventModal({ event, onClose }) {
  const [showVideo, setShowVideo] = useState(false);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const videoUrl = event.video_url || event.videoUrl;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl bg-white overflow-hidden shadow-2xl my-4 sm:my-6 md:my-8 border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-[110] w-10 h-10 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-[#238155] transition-all duration-300 hover:scale-105"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Media Section */}
          <div className="relative w-full h-[240px] sm:h-[300px] md:h-[400px] bg-black">
            {showVideo && videoUrl ? (
              <div className="relative w-full h-full">
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full"
                  title={event.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute bottom-4 left-4 z-10 bg-black/70 text-white text-[10px] px-3 py-1.5 rounded-none flex items-center gap-2 hover:bg-[#238155] transition-colors backdrop-blur-sm font-black uppercase tracking-widest"
                >
                  <Eye size={12} /> SHOW COVER
                </button>
              </div>
            ) : (
              <div className="relative w-full h-full group">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {videoUrl && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-[#238155] px-4 py-2 rounded-none hover:bg-black transition-all duration-300 shadow-lg group"
                  >
                    <Play size={14} fill="white" className="text-white" />
                    <span className="text-white text-[10px] font-black tracking-[0.2em] uppercase">WATCH RECAP</span>
                  </button>
                )}
              </div>
            )}
          </div>
          
          <div className="p-8 sm:p-12 bg-white">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-[#238155] text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase italic">
                {event.category || event.type}
              </span>
              <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#238155]" /> {formatDate(event.date)}</span>
                <span className="flex items-center gap-1.5"><Users size={12} className="text-[#238155]" /> {event.attendees || "0"}+ Attendees</span>
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6 leading-none tracking-tighter uppercase italic">
              {event.title}
            </h2>
            
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest mb-8 pb-6 border-b border-gray-100">
              <MapPin size={14} className="text-[#238155]" />
              <span>{event.location}</span>
            </div>
            
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10 font-light">
              {event.description}
            </p>
            
            {event.highlights && event.highlights.length > 0 && (
              <div className="mb-10">
                <h3 className="text-[10px] font-black text-[#238155] uppercase tracking-[0.3em] mb-4 italic">Event Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {event.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] font-bold bg-gray-50 text-gray-400 px-3 py-1.5 border border-gray-100 uppercase tracking-widest">
                      # {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Status</span>
                  <span className="text-xs font-bold text-[#238155] uppercase tracking-widest italic flex items-center gap-2">
                    <History size={12} /> Historical Record
                  </span>
               </div>
               {videoUrl && !showVideo && (
                 <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black text-[#238155] hover:text-black transition-colors tracking-widest uppercase">
                   FULL RECAP <ArrowUpRight size={14} />
                 </a>
               )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── MAIN PAGE ──

export default function PreviousEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);

    async function fetchEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "previous")
        .order("date", { ascending: false });
      if (data) setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const featuredEvent = events.find(e => e.featured) || events[0];
  const regularEvents = events.filter(e => e.id !== featuredEvent?.id);
  const massiveEvents = regularEvents.slice(0, 4);
  const compactEvents = regularEvents.slice(4);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="relative overflow-hidden">
        {/* Background Texture - Square Grid */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "linear-gradient(135deg, #f4f6f9, #e9eef5)" }} />
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40" style={{
            backgroundImage: `
              linear-gradient(rgba(35, 129, 85, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(35, 129, 85, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
        }} />

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {particles.map((p) => (
            <motion.div key={p.id} className="absolute rounded-full"
              style={{ width: p.size, height: p.size, background: `rgba(35, 129, 85, ${p.opacity})`, left: p.left, top: p.top }}
              animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {featuredEvent && <HeroFeaturedEvent event={featuredEvent} onOpenModal={setSelectedEvent} />}

          <main className="max-w-7xl mx-auto px-6 py-20">
            {loading ? (
              <div className="flex justify-center py-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238155]"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-16 border-b border-gray-100 pb-6">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">RECORDED HISTORY</h2>
                    <p className="text-gray-400 text-xs tracking-widest mt-1 uppercase">{events.length} Successful Initiatives</p>
                  </div>
                </div>

                <div className="space-y-12 mb-24">
                  {massiveEvents.map((event, i) => (
                    <MassiveEventCard key={event.id} event={event} index={i} isEven={i % 2 === 1} onClick={setSelectedEvent} />
                  ))}
                </div>

                {compactEvents.length > 0 && (
                  <div>
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-8 italic">Past Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {compactEvents.map(event => (
                        <CompactEventCard key={event.id} event={event} onClick={setSelectedEvent} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
