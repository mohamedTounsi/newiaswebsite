"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Trash2, Copy, Check, ChevronLeft, Image as ImageIcon, Database, DatabaseZap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) router.push("/admin");
    fetchImages();
  }, [router]);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("event-images")
      .list("events/");

    if (error) {
      console.error("Error fetching images:", error);
    } else if (data) {
      const imageUrls = await Promise.all(
        data.map(async (file) => {
          const {
            data: { publicUrl },
          } = supabase.storage
            .from("event-images")
            .getPublicUrl(`events/${file.name}`);
          return { name: file.name, url: publicUrl, id: file.id };
        })
      );
      setImages(imageUrls);
    }
    setLoading(false);
  };

  const deleteImage = async (imageName) => {
    const { error } = await supabase.storage
      .from("event-images")
      .remove([`events/${imageName}`]);

    if (error) {
      alert("Error deleting image: " + error.message);
    } else {
      setDeleteConfirm(null);
      fetchImages();
    }
  };

  const copyToClipboard = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
            <div className="flex items-center gap-2 text-[#238155] mb-2 font-black tracking-[0.2em] uppercase text-[10px]">
                <Database size={14} /> Storage Bucket
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">Visual Assets</h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 text-white/50 px-8 py-4 text-[11px] font-black tracking-[0.3em] uppercase">
            <DatabaseZap size={18} /> {images.length} Objects
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-10 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#238155]"></div>
            <span className="text-[10px] font-black text-[#238155] tracking-[0.4em] uppercase">Scanning Bucket...</span>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-40 bg-white border border-dashed border-slate-200">
            <ImageIcon size={48} className="mx-auto text-slate-200 mb-6" />
            <p className="text-slate-400 text-2xl font-extralight tracking-widest uppercase">Bucket is empty</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {images.map((image) => (
              <motion.div
                layout
                key={image.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white border border-slate-200 overflow-hidden hover:border-[#238155]/40 hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                <div className="w-full aspect-square relative overflow-hidden bg-slate-50">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate mb-4" title={image.name}>
                        {image.name.replace(/^events\//, '')}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => copyToClipboard(image.url, image.name)}
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-[#238155] transition-all"
                        >
                            {copiedId === image.name ? <Check size={14} /> : <Copy size={14} />}
                            {copiedId === image.name ? "Copied" : "Copy URL"}
                        </button>
                        <button
                            onClick={() => setDeleteConfirm(image)}
                            className="p-3 border border-slate-100 text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

        {/* Delete Confirmation Overlay */}
        <AnimatePresence>
            {deleteConfirm && (
            <div key="delete-confirm" className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteConfirm(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white p-12 max-w-md w-full shadow-2xl border-t-4 border-red-600">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-8">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-4 leading-none">Destroy Object</h3>
                        <p className="text-slate-500 text-sm mb-10 leading-relaxed font-light">Confirming permanent erasure of object <span className="font-bold text-slate-900 break-all">"{deleteConfirm.name}"</span> from the storage bucket. This operation is absolute and non-reversible.</p>
                        <div className="flex gap-4 w-full">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 text-[10px] font-black tracking-widest uppercase border border-slate-100 hover:bg-slate-50 transition-all text-slate-900">Abort</button>
                            <button onClick={() => deleteImage(deleteConfirm.name)} className="flex-1 py-4 text-[10px] font-black tracking-widest uppercase bg-red-600 text-white hover:bg-black transition-all">Execute Erase</button>
                        </div>
                    </div>
                </motion.div>
            </div>
            )}
        </AnimatePresence>
    </div>
  );
}
