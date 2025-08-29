"use client";
import { useEffect, useState } from "react";

const categories = ["ALL", "ACADEMIC", "FACILITIES", "SPORTS", "ARTS", "EVENTS", "CAMPUS_LIFE"];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const fetchImages = async () => {
    const res = await fetch(`/api/gallery/list?category=${selectedCategory}`);
    const data = await res.json();
    setImages(data);
  };

  const deleteImage = async (id) => {
    if (!confirm("Delete this image?")) return;
    await fetch("/api/gallery/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  return (
    <div>
      {/* Category Filters */}
      <div className="flex gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded ${selectedCategory === cat ? "bg-orange-500 text-white" : "bg-gray-200"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {images.length === 0 ? (
        <p className="text-gray-500">No Images Found</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img._id} className="border rounded-lg p-2 shadow">
              <img src={img.url} alt={img.title} className="w-full h-40 object-cover rounded" />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">{img.category}</span>
                <button
                  onClick={() => deleteImage(img._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
