// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to upload event images
export async function uploadEventImage(file, eventTitle) {
  if (!file) return null;
  
  const fileExt = file.name.split('.').pop();
  const safeTitle = eventTitle.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
  const fileName = `${Date.now()}_${safeTitle}.${fileExt}`;
  const filePath = `${fileName}`;
  
  const { data, error } = await supabase.storage
    .from('event-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type
    });
    
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('event-images')
    .getPublicUrl(filePath);
    
  return publicUrl;
}

// Helper function to upload team images
export async function uploadTeamImage(file, firstName, lastName) {
  if (!file) return null;
  
  const fileExt = file.name.split('.').pop();
  const safeName = `${firstName}_${lastName}`.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const fileName = `${Date.now()}_${safeName}.${fileExt}`;
  const filePath = `${fileName}`;
  
  const { data, error } = await supabase.storage
    .from('team-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type
    });
    
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('team-images')
    .getPublicUrl(filePath);
    
  return publicUrl;
}