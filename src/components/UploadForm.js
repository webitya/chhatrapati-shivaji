"use client";
import { useState } from "react";

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("ACADEMIC");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const res = await fetch("/api/gallery/upload", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    if (res.ok) {
      setFile(null);
      onUploaded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-4">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="ACADEMIC">Academic</option>
        <option value="FACILITIES">Facilities</option>
        <option value="SPORTS">Sports</option>
        <option value="ARTS">Arts</option>
        <option value="EVENTS">Events</option>
        <option value="CAMPUS_LIFE">Campus Life</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 text-white px-3 py-1 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
