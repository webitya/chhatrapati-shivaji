"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import ContentSection from "@/components/ui/content-section"
import SectionHeader from "@/components/ui/section-header"
import EventCard from "@/components/ui/event-card"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState("all")

  // Sample events data - in real app, this would come from API
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

  const filteredEvents = events.filter((event) => {
    return filterCategory === "all" || event.category.toLowerCase() === filterCategory.toLowerCase()
  })

  const categories = ["all", "academic", "arts", "sports", "community"]

  return (
    <MainLayout>
      {/* Hero Section */}
      <ContentSection background="primary" padding="default">
        <div className="text-center space-y-4">
          <SectionHeader
            title="School Events"
            subtitle="Stay connected with our vibrant school community through exciting events and activities"
            centered
          />
        </div>
      </ContentSection>

      {/* Filter */}
      <ContentSection background="muted" padding="sm">
        <div className="flex justify-center">
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
        </div>
      </ContentSection>

      {/* Events List */}
      <ContentSection padding="lg">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="space-y-8">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    category={event.category}
                    image={event.image}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No events found in this category.</p>
              </div>
            )}
          </div>
        )}
      </ContentSection>

      {/* Call to Action */}
      <ContentSection background="secondary" padding="default">
        <div className="text-center space-y-6">
          <h2 className="font-serif font-bold text-2xl text-white">Do not Miss Out!</h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates about upcoming events and important school announcements.
          </p>
          <Button size="lg" className="bg-white text-secondary hover:bg-white/90 px-8 py-3 text-lg font-semibold">
            Subscribe to Updates
          </Button>
        </div>
      </ContentSection>
    </MainLayout>
  )
}
