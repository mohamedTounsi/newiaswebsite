"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, uploadEventImage } from "@/lib/supabase";
import {
  Trash2,
  Plus,
  Edit,
  X,
  Upload,
  Calendar as CalendarIcon,
  MapPin,
  Users,
  ExternalLink,
  Star,
  Activity,
  Play,
  Check,
  ChevronRight,
  ChevronLeft,
  Filter,
  Search,
  LayoutGrid,
  List,
  AlertCircle,
  Database,
  Link as LinkIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventManager({ status, title }) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // list or grid
  
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    category: "",
    date: "",
    end_date: "",
    location: "",
    description: "",
    attendees: "",
    highlights: "",
    registration_link: "",
    featured: false,
    video_url: "",
    featured_icon_url: "",
    website_url: ""
  });
  
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", status)
      .order("date", { ascending: status === "upcoming" });

    if (!error) {
      setEvents(data || []);
      setFilteredEvents(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [status]);

  useEffect(() => {
    const filtered = events.filter(e => 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "",
      category: "",
      date: "",
      end_date: "",
      location: "",
      description: "",
      attendees: "",
      highlights: "",
      registration_link: "",
      featured: false,
      video_url: "",
      featured_icon_url: "",
      website_url: ""
    });
    setImageFile(null);
    setImagePreview(null);
    setIconFile(null);
    setIconPreview(null);
    setEditingEvent(null);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      type: event.type || "",
      category: event.category || "",
      date: event.date || "",
      end_date: event.end_date || "",
      location: event.location || "",
      description: event.description || "",
      attendees: event.attendees || "",
      highlights: event.highlights ? event.highlights.join(", ") : "",
      registration_link: event.registration_link || "",
      featured: event.featured || false,
      video_url: event.video_url || "",
      featured_icon_url: event.featured_icon_url || "",
      website_url: event.website_url || ""
    });
    setImagePreview(event.image);
    setIconPreview(event.featured_icon_url);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      let imageUrl = imagePreview;
      if (imageFile) {
        imageUrl = await uploadEventImage(imageFile, formData.title);
      }

      let featuredIconUrl = iconPreview;
      if (iconFile) {
        featuredIconUrl = await uploadEventImage(iconFile, formData.title + "_icon");
      }

      const highlightsArray = formData.highlights
        ? formData.highlights.split(",").map(h => h.trim()).filter(h => h)
        : [];

      const eventData = {
        ...formData,
        image: imageUrl,
        featured_icon_url: featuredIconUrl,
        highlights: highlightsArray,
        status: status,
      };

      let error;
      if (editingEvent) {
        const { error: err } = await supabase.from("events").update(eventData).eq("id", editingEvent.id);
        error = err;
      } else {
        const { error: err } = await supabase.from("events").insert([eventData]);
        error = err;
      }

      if (error) {
        showToast("error", error.message);
      } else {
        showToast("success", editingEvent ? "Event updated successfully" : "Event created successfully");
        setTimeout(() => {
          setShowModal(false);
          resetForm();
          fetchEvents();
        }, 500);
      }
    } catch (err) {
      showToast("error", "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) {
      showToast("success", "Record deleted from archives");
      fetchEvents();
      setDeleteConfirm(null);
    } else {
      showToast("error", "Failed to delete record");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Header Bar */}
      <div className="bg-black text-white relative z-20">
        <div className="max-w-[1800px] mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-[#238155] mb-4 font-black tracking-[0.2em] uppercase text-[10px] hover:translate-x-[-4px] transition-transform">
                <ChevronLeft size={14} /> Back to Hub
            </Link>
            <div className="flex items-center gap-2 text-[#238155] mb-2 font-black tracking-[0.2em] uppercase text-[10px]">
                <Database size={14} /> System Records
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">{title}</h1>
          </div>
          
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="group flex items-center gap-4 bg-[#238155] text-white px-8 py-4 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            <Plus size={18} /> New Record
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search by title, category, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#238155]/20 focus:border-[#238155] transition-all outline-none rounded-none text-black"
                    />
                </div>
                <div className="flex border border-slate-100 bg-slate-50">
                    <button 
                        onClick={() => setViewMode("list")}
                        className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-white text-[#238155] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <List size={18} />
                    </button>
                    <button 
                        onClick={() => setViewMode("grid")}
                        className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-white text-[#238155] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                </div>
            </div>
            
            <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Total: {filteredEvents.length} Entries</span>
                <span className="w-px h-4 bg-slate-200" />
                <span>Filters: All Archives</span>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-10 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#238155]"></div>
            <span className="text-[10px] font-black text-[#238155] tracking-[0.4em] uppercase">Fetching Data...</span>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-40 bg-white border border-dashed border-slate-200">
            <AlertCircle size={48} className="mx-auto text-slate-200 mb-6" />
            <p className="text-slate-400 text-2xl font-extralight tracking-widest uppercase">No matching records found</p>
            <button onClick={() => setSearchQuery("")} className="mt-6 text-[#238155] text-[10px] font-black uppercase tracking-widest hover:underline">Clear Search Filter</button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
            {filteredEvents.map((event) => (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`group bg-white border border-slate-200 overflow-hidden hover:border-[#238155]/40 hover:shadow-xl transition-all duration-500 ${viewMode === 'list' ? 'flex flex-row items-center gap-8 p-6' : 'flex flex-col'}`}
              >
                {/* Visual Status Indicator */}
                <div className={`absolute top-0 left-0 w-1 h-full ${event.featured ? 'bg-[#238155]' : 'bg-slate-100 group-hover:bg-slate-200'}`} />
                
                <div className={`${viewMode === 'list' ? 'w-48 aspect-video' : 'w-full aspect-video'} flex-shrink-0 relative overflow-hidden bg-slate-50`}>
                  <img src={event.image || "/placeholder.jpg"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                  {event.featured && (
                    <div className="absolute top-0 left-0 bg-[#238155] p-2 flex items-center gap-2">
                      <Star size={12} fill="white" className="text-white" />
                      <span className="text-[8px] font-black text-white uppercase tracking-tighter">Featured</span>
                    </div>
                  )}
                </div>

                <div className={`flex-1 min-w-0 ${viewMode === 'grid' ? 'p-6' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-slate-50 text-slate-400 px-2 py-1 text-[8px] font-black tracking-widest uppercase border border-slate-100">{event.category || "General"}</span>
                    <span className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className={`font-black text-slate-900 group-hover:text-[#238155] leading-tight uppercase tracking-tighter italic mb-4 transition-colors ${viewMode === 'list' ? 'text-2xl' : 'text-xl'}`}>
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#238155]" /> {event.location}</span>
                    <span className="flex items-center gap-1.5"><Users size={12} className="text-[#238155]" /> {event.attendees || "0"} Attendees</span>
                    {event.video_url && <span className="flex items-center gap-1.5 text-[#238155]"><Play size={12} fill="#238155" /> Recap Available</span>}
                  </div>
                  
                  {viewMode === 'grid' && (
                    <div className="flex gap-2 pt-6 border-t border-slate-50">
                        <button onClick={() => openEditModal(event)} className="flex-1 bg-slate-900 text-white py-3 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-[#238155] transition-all">Edit Record</button>
                        <button onClick={() => setDeleteConfirm(event)} className="p-3 border border-slate-100 text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all">
                            <Trash2 size={16} />
                        </button>
                    </div>
                  )}
                </div>

                {viewMode === 'list' && (
                  <div className="flex gap-3 relative z-10 px-4">
                    <button onClick={() => openEditModal(event)} className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-[#238155] hover:text-white transition-all">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => setDeleteConfirm(event)} className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-red-600 hover:text-white transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - Professional Slide-over Overlay */}
      <AnimatePresence>
        {showModal && (
          <div key="event-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div 
                initial={{ opacity: 0, x: 100 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 100 }} 
                className="relative w-full max-w-5xl bg-white shadow-2xl h-full sm:h-auto max-h-screen sm:max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="bg-black text-white px-8 py-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#238155] flex items-center justify-center">
                        <Database size={16} />
                    </div>
                    <div>
                        <h2 className="text-sm font-black tracking-[0.3em] uppercase italic">
                            {editingEvent ? "Modify Record" : "New Entry Allocation"}
                        </h2>
                        <p className="text-[8px] text-white/40 tracking-[0.2em] uppercase">Core Database V2.0</p>
                    </div>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-12 bg-[#fcfdfe]">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3 flex items-center gap-2">
                        <ChevronRight size={10} className="text-[#238155]" /> Primary Identification
                      </label>
                      <input name="title" placeholder="Event Name..." value={formData.title} onChange={handleChange} required className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] transition-all outline-none text-black" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3 flex items-center gap-2">
                           <Filter size={10} className="text-[#238155]" /> Classification
                        </label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black">
                          <option value="">General</option>
                          <option value="conference">Conference</option>
                          <option value="workshop">Workshop</option>
                          <option value="bootcamp">Bootcamp</option>
                          <option value="competition">Competition</option>
                          <option value="hackathon">Hackathon</option>
                          <option value="anniversary">Anniversary</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3 flex items-center gap-2">
                           <CalendarIcon size={10} className="text-[#238155]" /> Timestamp
                        </label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3 flex items-center gap-2">
                         <MapPin size={10} className="text-[#238155]" /> Geospatial Deployment
                      </label>
                      <input name="location" placeholder="e.g. ISIMS, Sfax..." value={formData.location} onChange={handleChange} required className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                    </div>

                    <div className="p-6 bg-[#238155]/5 border border-[#238155]/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="w-6 h-6 accent-[#238155] cursor-pointer" />
                            <label htmlFor="featured" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#238155] cursor-pointer select-none">Prioritize as Featured</label>
                        </div>
                        <Star size={16} className={formData.featured ? "text-[#238155]" : "text-slate-300"} />
                    </div>

                    <AnimatePresence>
                        {formData.featured && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-8 overflow-hidden pt-4">
                                <div>
                                    <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3 flex items-center gap-2">
                                        <Upload size={10} className="text-[#238155]" /> Featured Icon (Square)
                                    </label>
                                    <div className="aspect-square w-32 bg-slate-50 relative group cursor-pointer border-2 border-dashed border-slate-100 hover:border-[#238155] transition-all overflow-hidden">
                                        {iconPreview ? (
                                        <>
                                            <img src={iconPreview} className="w-full h-full object-cover" alt="" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Upload className="text-white" size={24} />
                                            </div>
                                        </>
                                        ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-2">
                                            <Upload size={16} strokeWidth={1} />
                                            <span className="text-[8px] font-black tracking-widest uppercase text-center px-2">Upload Icon</span>
                                        </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={handleIconChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3 flex items-center gap-2">
                                        <LinkIcon size={10} className="text-[#238155]" /> Official Website Link
                                    </label>
                                    <input name="website_url" value={formData.website_url} onChange={handleChange} placeholder="e.g. https://event-website.com" className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3 flex items-center gap-2">
                         <Upload size={10} className="text-[#238155]" /> Visual Asset Dispatch
                      </label>
                      <div className="aspect-video bg-slate-50 relative group cursor-pointer border-2 border-dashed border-slate-100 hover:border-[#238155] transition-all overflow-hidden">
                        {imagePreview ? (
                          <>
                            <img src={imagePreview} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Upload className="text-white" size={24} />
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-4">
                            <div className="w-16 h-16 border border-slate-100 flex items-center justify-center rounded-full group-hover:border-[#238155] group-hover:text-[#238155] transition-colors">
                                <Upload size={24} strokeWidth={1} />
                            </div>
                            <span className="text-[9px] font-black tracking-widest uppercase">Upload 16:9 Image</span>
                          </div>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3 flex items-center gap-2">
                         <LinkIcon size={10} className="text-[#238155]" /> External Media Link
                      </label>
                      <input name="video_url" value={formData.video_url} onChange={handleChange} placeholder="Recap Video URL (IG/YT)..." className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                    <div>
                      <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3 flex items-center gap-2">
                         <Activity size={10} className="text-[#238155]" /> Industrial Summary
                      </label>
                      <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Detailed technical overview..." className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black resize-none" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                       <div>
                        <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3 flex items-center gap-2">
                           <Users size={10} className="text-[#238155]" /> Attendee Metrics
                        </label>
                        <input name="attendees" value={formData.attendees} onChange={handleChange} placeholder="e.g. 250+" className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3 flex items-center gap-2">
                           <Activity size={10} className="text-[#238155]" /> Strategic Highlights
                        </label>
                        <input name="highlights" value={formData.highlights} onChange={handleChange} placeholder="Comma separated, e.g. Networking, Technical, Winners" className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                      </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                    <button 
                        type="submit" 
                        disabled={submitting} 
                        className="w-full bg-black text-white py-6 text-[11px] font-black tracking-[0.5em] uppercase hover:bg-[#238155] transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-4"
                    >
                        {submitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                                Transmitting...
                            </>
                        ) : (
                            <>
                                {editingEvent ? "Commit Changes" : "Initialize Record"}
                                <ChevronRight size={16} />
                            </>
                        )}
                    </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Delete Confirmation Overlay */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteConfirm(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-12 max-w-md w-full shadow-2xl border-t-4 border-red-600">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-8">
                        <Trash2 size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-4 leading-none">Security Override</h3>
                    <p className="text-slate-500 text-sm mb-10 leading-relaxed font-light">Confirming permanent erasure of record <span className="font-bold text-slate-900">"{deleteConfirm.title}"</span>. This operation is absolute and non-reversible.</p>
                    <div className="flex gap-4 w-full">
                        <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 text-[10px] font-black tracking-widest uppercase border border-slate-100 hover:bg-slate-50 transition-all text-slate-900">Abort</button>
                        <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 py-4 text-[10px] font-black tracking-widest uppercase bg-red-600 text-white hover:bg-black transition-all">Execute Erase</button>
                    </div>
                </div>
             </motion.div>
          </div>
        )}
        
        {/* Toast Notification */}
        <AnimatePresence>
            {toast.show && (
                <motion.div 
                    key="event-toast"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className={`fixed bottom-8 right-8 z-[200] px-8 py-4 flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl ${toast.type === 'success' ? 'bg-[#238155]' : 'bg-red-600'}`}
                >
                    {toast.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                    {toast.message}
                </motion.div>
            )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
}
