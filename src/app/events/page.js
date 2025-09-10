"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState("all")
  const categories = ["all", "academic", "arts", "sports", "community"]

  // Sample events data
  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        title: "Holiday Concert",
        description:
          "Join us for our annual Holiday Concert featuring performances by our school choir, band, and orchestra. A magical evening of music and celebration.",
        date: "2024-12-20",
        time: "7:00 PM",
        location: "School Auditorium",
        category: "Arts",
        image: "/school-holiday-concert.png",
      },
      {
        id: 2,
        title: "Science Fair",
        description:
          "Students will showcase their innovative science projects and experiments. Come see the future scientists in action!",
        date: "2025-01-25",
        time: "9:00 AM - 3:00 PM",
        location: "Gymnasium",
        category: "Academic",
        image: "/school-science-fair.png",
      },
      {
        id: 3,
        title: "Parent-Teacher Conference",
        description: "Individual meetings between parents and teachers to discuss student progress and development.",
        date: "2024-12-15",
        time: "2:00 PM - 8:00 PM",
        location: "Individual Classrooms",
        category: "Academic",
        image: "/parent-teacher-conference.png",
      },
      {
        id: 4,
        title: "Basketball Championship",
        description:
          "Cheer on our Eagles as they compete in the regional basketball championship. School spirit encouraged!",
        date: "2025-02-10",
        time: "6:00 PM",
        location: "Sports Complex",
        category: "Sports",
        image: "/placeholder-4x5zg.png",
      },
      {
        id: 5,
        title: "Art Exhibition Opening",
        description:
          "Celebrate creativity with our annual student art exhibition featuring works from all grade levels.",
        date: "2025-03-05",
        time: "5:00 PM - 8:00 PM",
        location: "Art Gallery",
        category: "Arts",
        image: "/student-art-exhibition.png",
      },
      {
        id: 6,
        title: "Spring Fundraising Gala",
        description:
          "An elegant evening of dining, entertainment, and fundraising to support our school programs and facilities.",
        date: "2025-04-12",
        time: "6:30 PM",
        location: "Grand Ballroom",
        category: "Community",
        image: "/school-fundraising-gala.png",
      },
    ]

    setTimeout(() => {
      setEvents(sampleEvents)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredEvents = events.filter(event =>
    filterCategory === "all" || event.category.toLowerCase() === filterCategory.toLowerCase()
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
              <div key={event.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                {event.image && (
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                    <span>Date: {event.date}</span>
                    <span>Time: {event.time}</span>
                    <span>Location: {event.location}</span>
                    <span>Category: {event.category}</span>
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
          Subscribe to Updates
        </button>
      </section>
    </MainLayout>
  )
}
