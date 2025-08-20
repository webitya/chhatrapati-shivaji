"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import ContentSection from "@/components/ui/content-section"
import SectionHeader from "@/components/ui/section-header"
import NoticeCard from "@/components/ui/notice-card"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function NoticesPage() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  // Sample notices data - in real app, this would come from API
  useEffect(() => {
    const sampleNotices = [
      {
        id: 1,
        title: "Winter Break Schedule 2024",
        content:
          "School will be closed from December 23, 2024, to January 8, 2025. Classes will resume on January 9, 2025. Enjoy your holidays!",
        date: "2024-12-01",
        category: "Academic",
        priority: "high",
      },
      {
        id: 2,
        title: "Parent-Teacher Conference",
        content:
          "Parent-teacher conferences are scheduled for December 15-16, 2024. Please contact your child's teacher to schedule an appointment.",
        date: "2024-11-28",
        category: "Events",
        priority: "normal",
      },
      {
        id: 3,
        title: "Science Fair Registration Open",
        content:
          "Registration for the annual Science Fair is now open. Students can submit their project proposals until January 15, 2025.",
        date: "2024-11-25",
        category: "Academic",
        priority: "normal",
      },
      {
        id: 4,
        title: "New Library Hours",
        content:
          "Starting December 1, 2024, the library will be open from 7:30 AM to 6:00 PM on weekdays and 9:00 AM to 3:00 PM on Saturdays.",
        date: "2024-11-20",
        category: "General",
        priority: "low",
      },
      {
        id: 5,
        title: "Emergency Drill Schedule",
        content:
          "Fire and earthquake drills will be conducted on December 10, 2024. Please review safety procedures with your children.",
        date: "2024-11-18",
        category: "Safety",
        priority: "high",
      },
      {
        id: 6,
        title: "Holiday Concert Invitation",
        content:
          "Join us for our annual Holiday Concert on December 20, 2024, at 7:00 PM in the school auditorium. All families are welcome!",
        date: "2024-11-15",
        category: "Events",
        priority: "normal",
      },
    ]

    setTimeout(() => {
      setNotices(sampleNotices)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || notice.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const categories = ["all", "academic", "events", "general", "safety"]

  return (
    <MainLayout>
      {/* Hero Section */}
      <ContentSection background="primary" padding="default">
        <div className="text-center space-y-4">
          <SectionHeader
            title="School Notices"
            subtitle="Stay updated with the latest announcements and important information"
            centered
          />
        </div>
      </ContentSection>

      {/* Search and Filter */}
      <ContentSection background="muted" padding="sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
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

      {/* Notices List */}
      <ContentSection padding="lg">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="space-y-8">
            {filteredNotices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNotices.map((notice) => (
                  <NoticeCard
                    key={notice.id}
                    title={notice.title}
                    content={notice.content}
                    date={notice.date}
                    category={notice.category}
                    priority={notice.priority}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No notices found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </ContentSection>
    </MainLayout>
  )
}
