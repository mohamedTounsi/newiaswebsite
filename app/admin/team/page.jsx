"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, uploadTeamImage } from "@/lib/supabase";
import {
  Trash2,
  Plus,
  Edit,
  X,
  Upload,
  Calendar,
  ChevronLeft,
  Users,
  Check,
  Search,
  Database,
  ArrowRight,
  ShieldCheck,
  Activity,
  GripHorizontal
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  RiInstagramLine,
  RiFacebookLine,
  RiLinkedinLine,
  RiMailLine,
} from "react-icons/ri";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamAdmin() {
  const router = useRouter();
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [newYear, setNewYear] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    position: "",
    instagram_url: "",
    facebook_url: "",
    linkedin_url: "",
    email_url: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) router.push("/admin");
    fetchYears();
  }, [router]);

  const fetchYears = async () => {
    const { data, error } = await supabase
      .from("years")
      .select("*")
      .order("year", { ascending: false });

    if (!error) {
      setYears(data || []);
      if (data && data.length > 0 && !selectedYear) {
        setSelectedYear(data[0]);
      }
    }
  };

  const fetchMembers = async (yearId) => {
    if (!yearId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("year_id", yearId)
      .order("display_order", { ascending: true });

    if (!error) setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedYear) fetchMembers(selectedYear.id);
  }, [selectedYear]);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const resetMemberForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      position: "",
      instagram_url: "",
      facebook_url: "",
      linkedin_url: "",
      email_url: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingMember(null);
  };

  const handleAddYear = async () => {
    if (!newYear || newYear.length !== 4) {
      showToast("error", "Invalid Year Format");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.from("years").insert([{ year: newYear }]).select();
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", "New Year Registered");
      setNewYear("");
      setShowYearModal(false);
      fetchYears();
    }
    setSubmitting(false);
  };

  const openEditMember = (member) => {
    setEditingMember(member);
    setFormData({
      first_name: member.first_name || "",
      last_name: member.last_name || "",
      position: member.position || "",
      instagram_url: member.instagram_url || "",
      facebook_url: member.facebook_url || "",
      linkedin_url: member.linkedin_url || "",
      email_url: member.email_url || "",
    });
    setImagePreview(member.image_url);
    setShowMemberModal(true);
  };

  const handleSubmitMember = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageUrl = imagePreview;
      if (imageFile) {
        imageUrl = await uploadTeamImage(imageFile, formData.first_name, formData.last_name);
      }
      const memberData = {
        year_id: selectedYear.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        position: formData.position,
        image_url: imageUrl,
        instagram_url: formData.instagram_url || null,
        facebook_url: formData.facebook_url || null,
        linkedin_url: formData.linkedin_url || null,
        email_url: formData.email_url || null,
      };

      let error;
      if (editingMember) {
        const { error: err } = await supabase.from("team_members").update(memberData).eq("id", editingMember.id);
        error = err;
      } else {
        const { error: err } = await supabase.from("team_members").insert([memberData]);
        error = err;
      }

      if (error) {
        showToast("error", error.message);
      } else {
        showToast("success", editingMember ? "Member profile updated" : "New member added to roster");
        setShowMemberModal(false);
        resetMemberForm();
        fetchMembers(selectedYear.id);
      }
    } catch (err) {
      showToast("error", "System transmission failure");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMember = async (id) => {
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (!error) {
      showToast("success", "Personnel record purged");
      fetchMembers(selectedYear.id);
      setDeleteConfirm(null);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(members);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Optimistic UI update
    setMembers(items);

    // Sync to database
    const updates = items.map((m, index) => ({
      id: m.id,
      display_order: index + 1
    }));
    
    await Promise.all(updates.map(u => 
      supabase.from("team_members").update({ display_order: u.display_order }).eq("id", u.id)
    ));
    showToast("success", "Roster order updated");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 selection:bg-[#238155] selection:text-white">
      {/* Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Header Bar */}
      <div className="bg-black text-white relative z-20">
        <div className="max-w-[1800px] mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-[#238155] mb-4 font-black tracking-[0.2em] uppercase text-[10px] hover:translate-x-[-4px] transition-transform">
                <ChevronLeft size={14} /> Back to Hub
            </Link>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">Team Command</h1>
          </div>
          
          <button
            onClick={() => setShowYearModal(true)}
            className="flex items-center gap-4 bg-white/10 text-white px-8 py-4 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-[#238155] transition-all duration-300"
          >
            <Calendar size={18} /> Register Term Year
          </button>
        </div>
      </div>

      {/* Toolbar / Year Switcher */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm overflow-x-auto no-scrollbar">
        <div className="max-w-[1800px] mx-auto px-8 flex items-center h-16">
            <div className="flex items-center gap-1 h-full">
                {years.map((year) => (
                    <button
                        key={year.id}
                        onClick={() => setSelectedYear(year)}
                        className={`h-full px-8 text-[11px] font-black tracking-[0.2em] uppercase transition-all relative ${
                            selectedYear?.id === year.id ? 'text-[#238155]' : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        {year.year}
                        {selectedYear?.id === year.id && (
                            <motion.div layoutId="activeYear" className="absolute bottom-0 left-0 right-0 h-1 bg-[#238155]" />
                        )}
                    </button>
                ))}
            </div>
            <div className="flex-1" />
            <div className="hidden lg:flex items-center gap-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                <span className="flex items-center gap-2"><Activity size={12} className="text-[#238155]" /> Personnel Registry Active</span>
            </div>
        </div>
      </div>

      <main className="max-w-[1800px] mx-auto px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
                <h2 className="text-sm font-black text-[#238155] uppercase tracking-[0.4em] mb-2 flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#238155]" /> Member Roster {selectedYear?.year}
                </h2>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Manage volunteers and leadership roles for this term.</p>
            </div>
            <button
                onClick={() => { resetMemberForm(); setShowMemberModal(true); }}
                className="group flex items-center gap-4 bg-[#238155] text-white px-8 py-4 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-black transition-all duration-500 shadow-[0_10px_30px_rgba(35,129,85,0.2)]"
            >
                <Plus size={18} /> Enlist New Personnel
            </button>
        </div>

        {loading ? (
            <div className="py-40 flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#238155]"></div>
                <span className="text-[10px] font-black text-[#238155] tracking-widest uppercase">Initializing Roster...</span>
            </div>
        ) : members.length === 0 ? (
            <div className="text-center py-40 bg-white border border-dashed border-slate-200">
                <Users size={48} className="mx-auto text-slate-200 mb-6" />
                <p className="text-slate-400 text-2xl font-extralight tracking-widest uppercase">Roster is empty for this term</p>
                <button onClick={() => setShowMemberModal(true)} className="mt-6 text-[#238155] text-[10px] font-black uppercase tracking-widest hover:underline">Add First Member</button>
            </div>
        ) : !mounted ? null : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="team-members" direction="horizontal">
                {(provided) => (
                  <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  >
                      {members.map((member, index) => (
                        <Draggable key={member.id} draggableId={String(member.id)} index={index}>
                          {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`group relative bg-white border border-slate-200 overflow-hidden hover:border-[#238155]/40 transition-all duration-700 ${snapshot.isDragging ? 'shadow-2xl scale-105 z-50 border-[#238155]' : ''}`}
                            >
                                <div 
                                  className="absolute top-0 left-0 z-50 p-3 bg-white/90 backdrop-blur-sm border-b border-r border-slate-200 cursor-grab active:cursor-grabbing hover:bg-slate-50 transition-colors"
                                  {...provided.dragHandleProps}
                                >
                                  <GripHorizontal size={16} className="text-slate-600 hover:text-[#238155]" />
                                </div>
                                <div className="aspect-[4/5] relative overflow-hidden bg-slate-50">
                                    <img
                                        src={member.image_url || "/placeholder-team.jpg"}
                                        alt={`${member.first_name}`}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                        <div className="flex gap-3 justify-center mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <button onClick={() => openEditMember(member)} className="w-12 h-12 bg-white text-black flex items-center justify-center hover:bg-[#238155] hover:text-white transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => setDeleteConfirm(member)} className="w-12 h-12 bg-white text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 relative">
                                    <div className="absolute top-0 right-6 -translate-y-1/2 w-10 h-10 bg-[#238155] flex items-center justify-center shadow-lg">
                                        <Users size={16} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-none mb-2">
                                        {member.first_name} <span className="text-[#238155]">{member.last_name}</span>
                                    </h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{member.position}</p>
                                    
                                    <div className="flex gap-4 mt-6 pt-6 border-t border-slate-50">
                                        {[
                                            { icon: RiInstagramLine, url: member.instagram_url },
                                            { icon: RiFacebookLine, url: member.facebook_url },
                                            { icon: RiLinkedinLine, url: member.linkedin_url },
                                            { icon: RiMailLine, url: member.email_url }
                                        ].map((soc, i) => (
                                            <div key={i} className={`p-2 ${soc.url ? 'text-[#238155]' : 'text-slate-200'}`}>
                                                <soc.icon size={14} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
        )}
      </main>

      {/* Personnel Modal */}
      <AnimatePresence>
        {showMemberModal && (
          <div key="member-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMemberModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }} 
                className="relative w-full max-w-4xl bg-white shadow-2xl h-full sm:h-auto max-h-screen sm:max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="bg-black text-white px-8 py-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#238155] flex items-center justify-center italic font-black text-lg">IAS</div>
                    <div>
                        <h2 className="text-sm font-black tracking-[0.3em] uppercase italic">
                            {editingMember ? "Personnel Re-assignment" : "New Enlistment Entry"}
                        </h2>
                        <p className="text-[8px] text-white/40 tracking-[0.2em] uppercase">Human Resources Module</p>
                    </div>
                </div>
                <button onClick={() => setShowMemberModal(false)} className="p-2 hover:bg-white/10 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmitMember} className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-12 bg-[#fcfdfe]">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3">First Name *</label>
                                <input name="first_name" value={formData.first_name} onChange={handleChange} required className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                            </div>
                            <div>
                                <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3">Last Name *</label>
                                <input name="last_name" value={formData.last_name} onChange={handleChange} required className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3">Industrial Position *</label>
                            <input name="position" placeholder="e.g. Chair, Marketing Head..." value={formData.position} onChange={handleChange} required className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block">Communication Nodes (URLs)</label>
                            {[
                                { name: 'instagram_url', icon: RiInstagramLine, placeholder: 'Instagram URL' },
                                { name: 'facebook_url', icon: RiFacebookLine, placeholder: 'Facebook URL' },
                                { name: 'linkedin_url', icon: RiLinkedinLine, placeholder: 'LinkedIn URL' },
                                { name: 'email_url', icon: RiMailLine, placeholder: 'Email Address' }
                            ].map((input) => (
                                <div key={input.name} className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#238155]">
                                        <input.icon size={14} />
                                    </div>
                                    <input name={input.name} value={formData[input.name] || ""} onChange={handleChange} placeholder={input.placeholder} className="w-full bg-white border border-slate-100 p-4 pl-12 text-[11px] focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3">Biometric Identification (Photo)</label>
                        <div className="aspect-[4/5] bg-slate-50 relative group cursor-pointer border-2 border-dashed border-slate-100 hover:border-[#238155] transition-all overflow-hidden flex flex-col items-center justify-center">
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} className="w-full h-full object-cover" alt="" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Upload className="text-white" size={24} />
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-4 text-slate-300">
                                    <div className="w-16 h-16 border border-slate-100 flex items-center justify-center rounded-full group-hover:border-[#238155] group-hover:text-[#238155] transition-colors">
                                        <Upload size={24} strokeWidth={1} />
                                    </div>
                                    <span className="text-[9px] font-black tracking-widest uppercase">Upload Profile Image</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                    <button 
                        type="submit" 
                        disabled={submitting} 
                        className="w-full bg-black text-white py-6 text-[11px] font-black tracking-[0.5em] uppercase hover:bg-[#238155] transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-4"
                    >
                        {submitting ? "Processing..." : (editingMember ? "Commit Changes" : "Finalize Enlistment")}
                        <ArrowRight size={16} />
                    </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Year Modal */}
        {showYearModal && (
          <div key="year-modal" className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowYearModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-12 max-w-md w-full shadow-2xl">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#238155] text-white flex items-center justify-center mb-8 shadow-lg">
                        <Calendar size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-4">Register New Term</h3>
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-10">Assign a 4-digit numeric year to the terminal.</p>
                    
                    <input 
                        type="text" 
                        placeholder="e.g. 2026"
                        maxLength={4}
                        value={newYear}
                        onChange={(e) => setNewYear(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 p-5 text-center text-2xl font-black tracking-[0.5em] focus:ring-2 focus:ring-[#238155]/10 outline-none text-black mb-8"
                    />

                    <div className="flex gap-4 w-full">
                        <button onClick={() => setShowYearModal(false)} className="flex-1 py-4 text-[10px] font-black tracking-widest uppercase border border-slate-100 hover:bg-slate-50 transition-all text-slate-900">Abort</button>
                        <button onClick={handleAddYear} disabled={submitting} className="flex-1 py-4 text-[10px] font-black tracking-widest uppercase bg-black text-white hover:bg-[#238155] transition-all">Confirm Registry</button>
                    </div>
                </div>
             </motion.div>
          </div>
        )}

        {/* Delete Confirmation */}
        {deleteConfirm && (
          <div key="delete-confirm" className="fixed inset-0 z-[120] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteConfirm(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-12 max-w-md w-full shadow-2xl border-t-4 border-red-600">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-8">
                        <Trash2 size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-4 leading-none">Security Purge</h3>
                    <p className="text-slate-500 text-sm mb-10 font-light">Confirming permanent removal of <span className="font-bold text-slate-900">{deleteConfirm.first_name} {deleteConfirm.last_name}</span> from the active roster.</p>
                    <div className="flex gap-4 w-full">
                        <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 text-[10px] font-black tracking-widest uppercase border border-slate-100 hover:bg-slate-50 transition-all text-slate-900">Abort</button>
                        <button onClick={() => handleDeleteMember(deleteConfirm.id)} className="flex-1 py-4 text-[10px] font-black tracking-widest uppercase bg-red-600 text-white hover:bg-black transition-all">Execute Purge</button>
                    </div>
                </div>
             </motion.div>
          </div>
        )}

        {/* Toast */}
        <AnimatePresence>
            {toast.show && (
                <motion.div 
                    key="team-toast"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className={`fixed bottom-8 right-8 z-[200] px-8 py-4 flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl ${toast.type === 'success' ? 'bg-[#238155]' : 'bg-red-600'}`}
                >
                    {toast.type === 'success' ? <Check size={16} /> : <Activity size={16} />}
                    {toast.message}
                </motion.div>
            )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
}
