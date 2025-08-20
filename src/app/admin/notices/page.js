"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Plus, Edit, Trash2, Search, Calendar } from "lucide-react"

export default function AdminNotices() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingNotice, setEditingNotice] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    priority: "normal",
  })

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      const response = await fetch("/api/admin/notices")
      if (response.ok) {
        const data = await response.json()
        setNotices(data)
      }
    } catch (error) {
      console.error("Error fetching notices:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingNotice ? `/api/admin/notices/${editingNotice._id}` : "/api/admin/notices"
      const method = editingNotice ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchNotices()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving notice:", error)
    }
  }

  const handleEdit = (notice) => {
    setEditingNotice(notice)
    setFormData({
      title: notice.title,
      content: notice.content,
      category: notice.category,
      priority: notice.priority,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      try {
        const response = await fetch(`/api/admin/notices/${id}`, { method: "DELETE" })
        if (response.ok) {
          fetchNotices()
        }
      } catch (error) {
        console.error("Error deleting notice:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({ title: "", content: "", category: "General", priority: "normal" })
    setEditingNotice(null)
    setShowForm(false)
  }

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const priorityColors = {
    low: "bg-secondary/10 text-secondary",
    normal: "bg-primary/10 text-primary",
    high: "bg-destructive/10 text-destructive",
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif font-bold text-3xl text-foreground">Manage Notices</h1>
            <p className="text-muted-foreground mt-2">Create and manage school notices and announcements</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Add Notice
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>

        {/* Form Modal */}
        {showForm && (
          <Card className="bg-card border-border">
            <CardHeader>
              <h2 className="font-serif font-semibold text-xl text-foreground">
                {editingNotice ? "Edit Notice" : "Add New Notice"}
              </h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                    <Input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                    >
                      <option value="General">General</option>
                      <option value="Academic">Academic</option>
                      <option value="Events">Events</option>
                      <option value="Safety">Safety</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Content</label>
                  <Textarea
                    required
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    {editingNotice ? "Update" : "Create"} Notice
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Notices List */}
        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotices.map((notice) => (
              <Card key={notice._id} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif font-semibold text-lg text-foreground">{notice.title}</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(notice)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(notice._id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Badge className={priorityColors[notice.priority]}>
                      {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                    </Badge>
                    <Badge variant="outline">{notice.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">{notice.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredNotices.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No notices found.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
