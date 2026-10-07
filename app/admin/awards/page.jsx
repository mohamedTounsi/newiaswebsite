"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, uploadAwardImage } from "@/lib/supabase";
import {
  Trash2,
  Plus,
  Edit,
  X,
  Upload,
  ChevronLeft,
  Check,
  Activity,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AwardsAdmin() {
  const router = useRouter();
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAward, setEditingAward] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date_received: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) router.push("/admin");
    fetchAwards();
  }, [router]);

  const fetchAwards = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("awards")
      .select("*")
      .order("date_received", { ascending: false });

    if (!error) setAwards(data || []);
    setLoading(false);
  };

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

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date_received: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingAward(null);
  };

  const openEdit = (award) => {
    setEditingAward(award);
    setFormData({
      title: award.title || "",
      description: award.description || "",
      date_received: award.date_received || "",
    });
    setImagePreview(award.image_url);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageUrl = imagePreview;
      if (imageFile) {
        imageUrl = await uploadAwardImage(imageFile, formData.title);
      }
      const awardData = {
        title: formData.title,
        description: formData.description,
        date_received: formData.date_received,
        image_url: imageUrl,
      };

      let error;
      if (editingAward) {
        const { error: err } = await supabase.from("awards").update(awardData).eq("id", editingAward.id);
        error = err;
      } else {
        const { error: err } = await supabase.from("awards").insert([awardData]);
        error = err;
      }

      if (error) {
        showToast("error", error.message);
      } else {
        showToast("success", editingAward ? "Award updated" : "New award added");
        setShowModal(false);
        resetForm();
        fetchAwards();
      }
    } catch (err) {
      showToast("error", "System transmission failure");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("awards").delete().eq("id", id);
    if (!error) {
      showToast("success", "Award record purged");
      fetchAwards();
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 selection:bg-[#238155] selection:text-white">
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <div className="bg-black text-white relative z-20">
        <div className="max-w-[1800px] mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-[#238155] mb-4 font-black tracking-[0.2em] uppercase text-[10px] hover:translate-x-[-4px] transition-transform">
                <ChevronLeft size={14} /> Back to Hub
            </Link>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">Awards Command</h1>
          </div>
          
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="group flex items-center gap-4 bg-[#238155] text-white px-8 py-4 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-white/10 hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(35,129,85,0.2)]"
          >
            <Plus size={18} /> Register New Award
          </button>
        </div>
      </div>

      <main className="max-w-[1800px] mx-auto px-8 py-12 relative z-10">
        {loading ? (
            <div className="py-40 flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#238155]"></div>
                <span className="text-[10px] font-black text-[#238155] tracking-widest uppercase">Fetching Awards...</span>
            </div>
        ) : awards.length === 0 ? (
            <div className="text-center py-40 bg-white border border-dashed border-slate-200">
                <Trophy size={48} className="mx-auto text-slate-200 mb-6" />
                <p className="text-slate-400 text-2xl font-extralight tracking-widest uppercase">No Awards Registered Yet</p>
                <button onClick={() => setShowModal(true)} className="mt-6 text-[#238155] text-[10px] font-black uppercase tracking-widest hover:underline">Add First Award</button>
            </div>
        ) : !mounted ? null : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {awards.map((award) => (
                    <div key={award.id} className="group relative bg-white border border-slate-200 overflow-hidden hover:border-[#238155]/40 transition-all duration-300">
                        <div className="aspect-[4/5] relative overflow-hidden bg-slate-50">
                            <img
                                src={award.image_url || "/placeholder-award.jpg"}
                                alt={award.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                <div className="flex gap-3 justify-center mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <button onClick={() => openEdit(award)} className="w-12 h-12 bg-white text-black flex items-center justify-center hover:bg-[#238155] hover:text-white transition-colors shadow-lg">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => setDeleteConfirm(award)} className="w-12 h-12 bg-white text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-lg">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 relative">
                            <p className="text-[10px] font-black text-[#238155] uppercase tracking-widest mb-1">{award.date_received}</p>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">
                                {award.title}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-3">{award.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </main>

      <AnimatePresence>
        {showModal && (
          <div key="award-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
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
                            {editingAward ? "Award Modification" : "New Award Entry"}
                        </h2>
                    </div>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-12 bg-[#fcfdfe]">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3">Award Title *</label>
                            <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                        </div>

                        <div>
                            <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3">Date Received *</label>
                            <input type="date" name="date_received" value={formData.date_received} onChange={handleChange} required className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black" />
                        </div>

                        <div>
                            <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-white border border-slate-100 p-5 text-sm focus:ring-2 focus:ring-[#238155]/10 focus:border-[#238155] outline-none text-black resize-none" />
                        </div>
                    </div>

                    <div>
                        <label className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-3">Award Visual Evidence (Photo)</label>
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
                                    <span className="text-[9px] font-black tracking-widest uppercase">Upload Image</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                    <button type="submit" disabled={submitting} className="w-full bg-black text-white py-6 text-[11px] font-black tracking-[0.5em] uppercase hover:bg-[#238155] transition-all duration-500 disabled:opacity-50">
                        {submitting ? "Processing..." : (editingAward ? "Commit Changes" : "Register Award")}
                    </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {deleteConfirm && (
          <div key="delete-confirm" className="fixed inset-0 z-[120] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteConfirm(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-12 max-w-md w-full shadow-2xl border-t-4 border-red-600">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-8">
                        <Trash2 size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-4 leading-none">Security Purge</h3>
                    <p className="text-slate-500 text-sm mb-10 font-light">Confirming permanent removal of <span className="font-bold text-slate-900">{deleteConfirm.title}</span>.</p>
                    <div className="flex gap-4 w-full">
                        <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 text-[10px] font-black tracking-widest uppercase border border-slate-100 hover:bg-slate-50 transition-all text-slate-900">Abort</button>
                        <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 py-4 text-[10px] font-black tracking-widest uppercase bg-red-600 text-white hover:bg-black transition-all">Execute Purge</button>
                    </div>
                </div>
             </motion.div>
          </div>
        )}

        <AnimatePresence>
            {toast.show && (
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className={`fixed bottom-8 right-8 z-[200] px-8 py-4 flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl ${toast.type === 'success' ? 'bg-[#238155]' : 'bg-red-600'}`}>
                    {toast.type === 'success' ? <Check size={16} /> : <Activity size={16} />}
                    {toast.message}
                </motion.div>
            )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
}
