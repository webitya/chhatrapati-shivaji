"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Upload, Search, Trash2, Eye, Plus, X } from "lucide-react"
import Image from "next/image"

export default function AdminGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    category: "Academic",
  })

  const categories = ["Academic", "Facilities", "Sports", "Arts", "Events", "Campus Life"]

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/admin/gallery")
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      }
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (selectedFiles.length === 0) return

    setUploading(true)
    try {
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append("images", file)
      })
      formData.append("title", uploadData.title)
      formData.append("description", uploadData.description)
      formData.append("category", uploadData.category)

      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        fetchImages()
        resetUploadForm()
      } else {
        alert("Upload failed. Please try again.")
      }
    } catch (error) {
      console.error("Error uploading images:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id, publicId) => {
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        const response = await fetch(`/api/admin/gallery/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId }),
        })
        if (response.ok) {
          fetchImages()
        }
      } catch (error) {
        console.error("Error deleting image:", error)
      }
    }
  }

  const resetUploadForm = () => {
    setUploadData({ title: "", description: "", category: "Academic" })
    setSelectedFiles([])
    setShowUploadForm(false)
  }

  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || image.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif font-bold text-3xl text-foreground">Gallery Management</h1>
            <p className="text-muted-foreground mt-2">Upload and manage school gallery images</p>
          </div>
          <Button
            onClick={() => setShowUploadForm(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Upload Images
          </Button>
        </div>

        {/* Upload Form Modal */}
        {showUploadForm && (
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="font-serif font-semibold text-xl text-foreground">Upload New Images</h2>
              <Button variant="ghost" size="sm" onClick={resetUploadForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Select Images</label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="bg-background border-border"
                    required
                  />
                  {selectedFiles.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">{selectedFiles.length} files selected</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                    <Input
                      required
                      value={uploadData.title}
                      onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                      className="bg-background border-border"
                      placeholder="Enter image title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      value={uploadData.category}
                      onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <Input
                    value={uploadData.description}
                    onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                    className="bg-background border-border"
                    placeholder="Enter image description (optional)"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={uploading || selectedFiles.length === 0}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {uploading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Images
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetUploadForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("all")}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={filterCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Images Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card
                key={image._id}
                className="group overflow-hidden bg-card border-border hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => window.open(image.url, "_blank")}
                        className="bg-white/90 hover:bg-white text-foreground"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDelete(image._id, image.publicId)}
                        className="bg-white/90 hover:bg-white text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground truncate">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{image.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{image.category}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredImages.length === 0 && !loading && (
          <div className="text-center py-16">
            <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-foreground mb-2">No Images Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterCategory !== "all"
                ? "No images match your current filters."
                : "Start by uploading some images to the gallery."}
            </p>
            {!searchTerm && filterCategory === "all" && (
              <Button
                onClick={() => setShowUploadForm(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Upload First Image
              </Button>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
