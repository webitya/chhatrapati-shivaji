"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, Trash2 } from "lucide-react"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [eventTitle, setEventTitle] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventImage, setEventImage] = useState(null)

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("success")

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events")
      const data = await res.json()
      setEvents(data)
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (!eventImage) {
      setMessage("⚠️ Please select an image before saving.")
      setMessageType("error")
      return
    }

    setSubmitting(true)

    try {
      // 1️⃣ Upload image to Cloudinary
      const formData = new FormData()
      formData.append("file", eventImage)
      formData.append("upload_preset", "ml_default") // your preset

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      )

      const uploadData = await uploadRes.json()
      if (!uploadData.secure_url || !uploadData.public_id) {
        setMessage("❌ Image upload failed. Try again.")
        setMessageType("error")
        return
      }

      // 2️⃣ Save event in MongoDB
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: eventTitle,
          date: eventDate,
          description: eventDescription,
          imageUrl: uploadData.secure_url,
          publicId: uploadData.public_id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`✅ "${eventTitle}" was saved successfully.`)
        setMessageType("success")
        setEventTitle("")
        setEventDate("")
        setEventDescription("")
        setEventImage(null)
        document.querySelector('input[type="file"]').value = ""
        fetchEvents()
      } else {
        setMessage(`❌ Error: ${data.message || "Could not save the event."}`)
        setMessageType("error")
      }
    } catch (error) {
      console.error("Error uploading event:", error)
      setMessage("❌ Something went wrong. Please try again.")
      setMessageType("error")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const response = await fetch(`/api/events/${id}`, { method: "DELETE" })
      if (response.ok) {
        setMessage("✅ Event deleted successfully")
        setMessageType("success")
        fetchEvents()
      } else {
        const data = await response.json()
        setMessage(`❌ Error: ${data.message}`)
        setMessageType("error")
      }
    } catch (error) {
      console.error("Error deleting event:", error)
      setMessage("❌ Failed to delete event.")
      setMessageType("error")
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif font-bold text-3xl text-foreground">Events</h1>
          <p className="text-muted-foreground mt-2">Manage school events</p>
        </div>

        {/* Add Event Form */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-lg">Add New Event</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {message && (
                <p className={`text-sm ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
                  {message}
                </p>
              )}
              <Input
                type="text"
                placeholder="Event Title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                required
              />
              <Input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
              <textarea
                placeholder="Event Description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="w-full border rounded-md p-2 bg-background text-foreground"
                rows={4}
                required
              />
              <Input type="file" accept="image/*" onChange={(e) => setEventImage(e.target.files[0])} required />
              <Button type="submit" className="bg-primary text-white" disabled={submitting}>
                {submitting ? "Saving..." : "Save Event"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Events List */}
        {loading ? (
          <p className="text-muted-foreground">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-muted-foreground">No events added yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event._id}>
                <CardContent className="p-4 space-y-3">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover rounded-lg" />
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-2 flex items-center gap-1"
                    onClick={() => handleDelete(event._id)}
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
