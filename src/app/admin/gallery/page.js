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
      for (const file of selectedFiles) {
        // 1️⃣ Upload to Cloudinary
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "ml_default") // replace with your Cloudinary preset

        const cloudRes = await fetch("/api/gallery/upload", {
          method: "POST",
          body: formData,
        })

        const cloudData = await cloudRes.json()
        if (!cloudRes.ok || !cloudData.secure_url) {
          throw new Error("Cloudinary upload failed")
        }

        // 2️⃣ Save metadata to MongoDB
        const saveRes = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: uploadData.title,
            description: uploadData.description,
            category: uploadData.category,
            url: cloudData.secure_url,
            publicId: cloudData.public_id,
          }),
        })

        if (!saveRes.ok) {
          throw new Error("Failed to save metadata")
        }
      }

      fetchImages()
      resetUploadForm()
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
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">Gallery Management</h1>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
              icon={<Search className="w-4 h-4 text-gray-400" />}
            />
            <Button onClick={() => setShowUploadForm(!showUploadForm)}>
              {showUploadForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              {showUploadForm ? "Cancel" : "Upload New"}
            </Button>
          </div>
        </div>

        {showUploadForm && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Upload Images</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <Input
                  placeholder="Title"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                />
                <Input
                  placeholder="Description"
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                />
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                  className="w-full border rounded-md p-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <input type="file" multiple onChange={handleFileSelect} className="w-full" />
                <Button type="submit" disabled={uploading}>
                  {uploading ? <LoadingSpinner /> : <Upload className="w-4 h-4 mr-2" />}
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : filteredImages.length === 0 ? (
          <p className="text-center text-gray-500">No images found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <Card key={image._id}>
                <CardContent className="p-4">
                  <div className="relative w-full h-48">
                    <Image src={image.url} alt={image.title} fill className="object-cover rounded-md" />
                  </div>
                  <h3 className="mt-2 font-semibold">{image.title}</h3>
                  <p className="text-sm text-gray-500">{image.description}</p>
                  <p className="text-xs text-gray-400">Category: {image.category}</p>
                  <div className="flex justify-between mt-3">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(image._id, image.publicId)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
