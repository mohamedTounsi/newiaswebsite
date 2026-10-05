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
  const hasSubEvents = event.sub_events?.length > 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`group cursor-pointer w-full mb-12 flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} relative bg-white border border-slate-100 hover:border-[#238155]/30 transition-all duration-700 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]`}
      onClick={() => onClick(event)}
    >
      {/* Industrial Accents */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-slate-100 group-hover:border-[#238155]/40 transition-colors" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-slate-100 group-hover:border-[#238155]/40 transition-colors" />
      
      <div className="lg:w-3/5 aspect-video overflow-hidden relative">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
        
        {/* Floating Category Label */}
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
          <div className="bg-black text-white px-4 py-2 text-[10px] font-black tracking-[0.3em] uppercase italic flex items-center gap-2 border border-white/10 backdrop-blur-md">
            {getEventIcon(event.category)} {event.category}
          </div>
          {hasSubEvents && (
            <div className="bg-[#238155] text-white px-3 py-1.5 text-[8px] font-black tracking-[0.2em] uppercase flex items-center gap-2 border border-white/5">
                <History size={10} /> {event.sub_events.length} ARCHIVED SESSIONS
            </div>
          )}
        </div>

        {/* Date Overlay */}
        <div className="absolute bottom-0 right-0 bg-white px-6 py-4 border-l border-t border-slate-100">
            <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase block mb-1">RECORDED DATE</span>
            <span className="text-sm font-black text-slate-900 uppercase tracking-tighter italic">{formatDate(event.date)}</span>
        </div>
      </div>

      <div className={`lg:w-2/5 p-12 flex flex-col justify-between relative`}>
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        
        <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-black text-[#238155] tracking-widest bg-[#238155]/5 px-2 py-1">ID: ARCH-0{index + 1}</span>
                <div className="h-px flex-1 bg-slate-100" />
            </div>

            <h3 className="text-4xl font-black text-slate-900 leading-none uppercase tracking-tighter mb-6 group-hover:text-[#238155] transition-colors italic">
              {event.title}
            </h3>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-10 font-light line-clamp-3">
              {event.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="border-l-2 border-slate-100 pl-4 py-1">
                    <p className="text-[8px] font-black text-slate-300 tracking-widest uppercase mb-1">Deployment</p>
                    <p className="text-[10px] font-bold text-slate-700 uppercase">{event.location}</p>
                </div>
                <div className="border-l-2 border-slate-100 pl-4 py-1">
                    <p className="text-[8px] font-black text-slate-300 tracking-widest uppercase mb-1">Impact</p>
                    <p className="text-[10px] font-bold text-slate-700 uppercase">{event.attendees || "0"}+ Units</p>
                </div>
            </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-8 border-t border-slate-100">
          <div className="flex items-center gap-2 group/link text-[10px] font-black text-[#238155] tracking-[0.3em] uppercase cursor-pointer">
            EXPAND DATA <ArrowUpRight size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </div>
          <Share2 size={14} className="text-slate-300 hover:text-[#238155] transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

function CompactEventCard({ event, onClick }) {
  const hasSubEvents = event.sub_events?.length > 0;
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group cursor-pointer bg-white border border-slate-100 overflow-hidden relative shadow-sm hover:shadow-2xl transition-all duration-500"
      onClick={() => onClick(event)}
    >
      {/* Corner Accent */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-slate-200 group-hover:border-[#238155] transition-colors z-20" />
      
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="bg-black/60 backdrop-blur-md text-white text-[7px] font-black tracking-widest px-2 py-1 uppercase flex items-center gap-1 w-fit border border-white/10">
            {getEventIcon(event.category)} {event.category}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-10">
             {hasSubEvents && (
                <div className="text-[6px] font-black text-[#238155] tracking-[0.3em] uppercase mb-2 flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-[#238155] rounded-full animate-pulse" />
                    {event.sub_events.length} ARCHIVED SESSIONS
                </div>
            )}
            <h4 className="text-sm font-black text-white leading-tight uppercase tracking-tight group-hover:text-[#238155] transition-colors italic">
                {event.title}
            </h4>
        </div>
      </div>

      <div className="p-5 flex items-center justify-between bg-white border-t border-slate-50">
        <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Deployment</span>
            <span className="text-[9px] font-bold text-slate-900 uppercase tracking-tight">{formatDate(event.date)}</span>
        </div>
        <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#238155] group-hover:border-[#238155] transition-all duration-500">
            <ArrowUpRight size={14} className="text-slate-300 group-hover:text-white transition-colors" />
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

            {event.sub_events && event.sub_events.length > 0 && (
                <div className="mb-10 p-8 bg-slate-50 border border-slate-100">
                    <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em] mb-8 flex items-center gap-2 italic border-b border-gray-200 pb-4">
                        <History size={14} className="text-[#238155]" /> Strategic Session Roadmap
                    </h3>
                    <div className="space-y-8">
                        {event.sub_events.map((sub, i) => (
                            <div key={i} className="relative pl-8 border-l-2 border-[#238155]/20 hover:border-[#238155] transition-colors">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-[#238155] flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#238155]" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight"># Session {i + 1}: {sub.title}</h4>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white px-2 py-1 border border-gray-100">{formatDate(sub.date)}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-[9px] font-black text-[#238155] uppercase tracking-widest">
                                        {sub.speaker && <span className="flex items-center gap-1.5"><Users size={12} /> Speaker: {sub.speaker}</span>}
                                        {sub.location && <span className="flex items-center gap-1.5"><MapPin size={12} /> Venue: {sub.location}</span>}
                                    </div>
                                    {sub.description && (
                                        <p className="text-xs text-gray-500 font-light leading-relaxed mt-2 italic">
                                            {sub.description}
                                        </p>
                                    )}
                                </div>
                            </div>
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
      
      if (data) {
        // Group sub-events
        const mainEvents = data.filter(e => !e.parent_id);
        const subEvents = data.filter(e => e.parent_id);
        
        const combined = mainEvents.map(main => ({
          ...main,
          sub_events: subEvents.filter(sub => sub.parent_id === main.id)
        }));
        setEvents(combined);
      }
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
