"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState("all")

  const categories = ["all", "academic", "arts", "sports", "community"]

  useEffect(() => {
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

    fetchEvents()
  }, [])

  const filteredEvents = events.filter(event =>
    filterCategory === "all" || event.category?.toLowerCase() === filterCategory.toLowerCase()
  )

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">School Events</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Stay connected with our vibrant school community through exciting events and activities.
        </p>
      </section>

      {/* Filter Buttons */}
      <section className="bg-gray-100 py-6">
        <div className="flex justify-center flex-wrap gap-3">
          {categories.map(category => (
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
      </section>

      {/* Events List */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading events...</div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div key={event._id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                {event.imageUrl && (
                  <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                    <span>Date: {new Date(event.date).toLocaleDateString()}</span>
                    {event.time && <span>Time: {event.time}</span>}
                    {event.location && <span>Location: {event.location}</span>}
                    {event.category && <span>Category: {event.category}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            No events found in this category.
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-secondary py-20 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Do not Miss Out!</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Subscribe to our newsletter to receive updates about upcoming events and important school announcements.
        </p>
        <button className="px-8 py-3 text-lg font-semibold bg-white text-secondary rounded hover:bg-white/90 transition">
          Subscribe to Updates.
        </button>
      </section>
    </MainLayout>
  )
}
