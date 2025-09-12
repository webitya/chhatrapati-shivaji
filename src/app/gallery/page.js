"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import ContentSection from "@/components/ui/content-section"
import SectionHeader from "@/components/ui/section-header"
import ImageCard from "@/components/ui/image-card"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/gallery")
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      } else {
        console.error("Failed to fetch images:", response.status)
      }
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredImages = images.filter((image) => {
    return (
      filterCategory === "all" ||
      (image.category && image.category.toLowerCase() === filterCategory.toLowerCase())
    )
  })

  const categories = ["all", "academic", "facilities", "sports", "arts", "events", "campus life"]

  return (
    <MainLayout>
      {/* Hero Section */}
      <ContentSection background="primary" padding="default">
        <div className="text-center space-y-4">
          <SectionHeader
            title="School Gallery"
            subtitle="Explore our vibrant school community through photos and memories"
            centered
          />
        </div>
      </ContentSection>

      {/* Filter and View Controls */}
      <ContentSection background="muted" padding="sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filterCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </ContentSection>

      {/* Gallery */}
      <ContentSection padding="lg">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="space-y-8">
            {filteredImages.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "grid grid-cols-1 md:grid-cols-2 gap-8"
                }
              >
                {filteredImages.map((image) => (
                  <ImageCard
                    key={image.id || image._id}
                    src={image.url || "/placeholder.svg"}
                    alt={image.title || "School image"}
                    title={image.title || "Untitled"}
                    description={image.description || ""}
                    aspectRatio={viewMode === "list" ? "aspect-video" : "aspect-square"}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No images found in this category.</p>
              </div>
            )}
          </div>
        )}
      </ContentSection>

      {/* Upload Section (for admin) */}
      <ContentSection background="secondary" padding="default">
        <div className="text-center space-y-6">
          <h2 className="font-serif font-bold text-2xl text-white">Share Your Memories</h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Have photos from school events or activities? Contact our admin team to share them with the community.
          </p>
          <Button size="lg" className="bg-white text-secondary hover:bg-white/90 px-8 py-3 text-lg font-semibold">
            Contact Admin
          </Button>
        </div>
      </ContentSection>
    </MainLayout>
  )
}
