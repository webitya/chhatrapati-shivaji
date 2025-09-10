"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Grid, List } from "lucide-react"

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  const categories = ["all", "academic", "facilities", "sports", "arts", "events", "campus life"]

  useEffect(() => {
    // Sample data for demo purposes
    const sampleImages = [
      { id: 1, url: "/school1.jpg", title: "Science Fair", description: "Students showcase their projects", category: "academic" },
      { id: 2, url: "/school2.jpg", title: "Basketball Championship", description: "School basketball team event", category: "sports" },
      { id: 3, url: "/school3.jpg", title: "Art Exhibition", description: "Annual student art exhibition", category: "arts" },
      { id: 4, url: "/school4.jpg", title: "Campus Life", description: "Students enjoying campus facilities", category: "campus life" },
      { id: 5, url: "/school5.jpg", title: "Music Concert", description: "Holiday music concert", category: "events" },
      { id: 6, url: "/school6.jpg", title: "Library Reading", description: "Students reading in library", category: "academic" },
    ]

    setTimeout(() => {
      setImages(sampleImages)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredImages = images.filter(
    (image) =>
      filterCategory === "all" || (image.category && image.category.toLowerCase() === filterCategory.toLowerCase())
  )

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">School Gallery</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Explore our vibrant school community through photos and memories
        </p>
      </section>

      {/* Filter & View Controls */}
      <section className="bg-gray-100 py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filterCategory === category
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-primary hover:text-white"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-2 justify-center md:justify-end">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-full transition ${
              viewMode === "grid" ? "bg-primary text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-primary hover:text-white"
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-full transition ${
              viewMode === "list" ? "bg-primary text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-primary hover:text-white"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading images...</div>
        ) : filteredImages.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <div className={viewMode === "list" ? "aspect-video" : "aspect-square"}>
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.title || "School image"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  {image.title && <h3 className="text-lg font-semibold mb-1">{image.title}</h3>}
                  {image.description && <p className="text-gray-600 text-sm">{image.description}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">No images found in this category.</div>
        )}
      </section>

      {/* Contact Section */}
      <section className="bg-secondary py-20 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Share Your Memories</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Have photos from school events or activities? Contact our admin team to share them with the community.
        </p>
        <button className="px-8 py-3 text-lg font-semibold bg-white text-secondary rounded hover:bg-white/90 transition">
          Contact Admin
        </button>
      </section>
    </MainLayout>
  )
}
