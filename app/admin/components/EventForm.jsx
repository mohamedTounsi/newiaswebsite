"use client";

import { useState } from "react";
import { supabase, uploadEventImage } from "@/lib/supabase";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export default function EventForm({ status }) {
  const [form, setForm] = useState({
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
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (message.text) setMessage({ type: "", text: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: "error",
          text: "Image must be less than 5MB",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setMessage({
          type: "error",
          text: "Please upload an image file",
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validate required fields
    if (!form.title || !form.date || !form.location) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields (Title, Date, Location)",
      });
      setLoading(false);
      return;
    }

    try {
      let imageUrl = null;

      // Upload image if selected
      if (imageFile) {
        try {
          imageUrl = await uploadEventImage(imageFile, form.title);
        } catch (uploadError) {
          setMessage({
            type: "error",
            text: "Failed to upload image. Please try again.",
          });
          setLoading(false);
          return;
        }
      }

      // Process highlights (split by comma)
      const highlightsArray = form.highlights
        ? form.highlights
            .split(",")
            .map((h) => h.trim())
            .filter((h) => h)
        : [];

      // Prepare data for insertion
      const eventData = {
        title: form.title,
        type: form.type || null,
        category: form.category || null,
        date: form.date || null,
        end_date: form.end_date || null,
        location: form.location,
        description: form.description || null,
        image: imageUrl, // Use uploaded image URL
        attendees: form.attendees || null,
        highlights: highlightsArray,
        registration_link: form.registration_link || null,
        status: status,
      };

      const { error } = await supabase.from("events").insert([eventData]);

      if (error) {
        console.error("Supabase error:", error);
        setMessage({
          type: "error",
          text: `Error: ${error.message}`,
        });
      } else {
        setMessage({
          type: "success",
          text: "Event added successfully!",
        });
        // Reset form
        setForm({
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
        });
        removeImage();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#238155] transition-colors";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <label className={labelClasses}>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className={inputClasses}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Type</label>
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="e.g., Workshop, Conference"
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select Category</option>
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="bootcamp">Bootcamp</option>
            <option value="competition">Competition</option>
            <option value="hackathon">Hackathon</option>
            <option value="anniversary">Anniversary</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Date *</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className={labelClasses}>End Date (Optional)</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Location *</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Event Location"
          className={inputClasses}
          required
        />
      </div>

      <div>
        <label className={labelClasses}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Event Description"
          rows="3"
          className={inputClasses}
        />
      </div>

      {/* Image Upload Section */}
      <div>
        <label className={labelClasses}>Event Image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#238155] transition-colors">
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-[#238155] hover:text-[#1a5e3d] focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className={labelClasses}>Attendees</label>
        <input
          name="attendees"
          value={form.attendees}
          onChange={handleChange}
          placeholder="e.g., 100+ or 50-100"
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Highlights (comma-separated)</label>
        <input
          name="highlights"
          value={form.highlights}
          onChange={handleChange}
          placeholder="Keynote speech, Networking session, Q&A panel"
          className={inputClasses}
        />
        <p className="text-xs text-gray-500 mt-1">
          Separate multiple highlights with commas
        </p>
      </div>

      <div>
        <label className={labelClasses}>Registration Link</label>
        <input
          name="registration_link"
          value={form.registration_link}
          onChange={handleChange}
          placeholder="https://example.com/register"
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#238155] text-white py-3 font-semibold rounded-lg hover:bg-[#1a5e3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "Adding Event..."
          : `Add ${status === "upcoming" ? "Upcoming" : "Past"} Event`}
      </button>
    </form>
  );
}
