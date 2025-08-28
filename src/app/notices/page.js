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

  // Fetch notices from API
  useEffect(() => {
    const fetchNotices = async () => {
      console.log("📡 Fetching notices from /api/notices...")
      try {
        const res = await fetch("/api/notices")
        console.log("✅ Fetch response status:", res.status)

        if (res.ok) {
          const data = await res.json()
          console.log("📥 Notices received:", data)
          setNotices(data)
        } else {
          console.error("❌ Fetch failed with status:", res.status)
        }
      } catch (error) {
        console.error("🚨 Error fetching notices:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  // Filter by search + category
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      filterCategory === "all" ||
      (notice.category &&
        notice.category.toLowerCase() === filterCategory.toLowerCase())

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

      {/* Search + Filter */}
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
                    key={notice._id}
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
                <p className="text-muted-foreground text-lg">
                  No notices found matching your criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </ContentSection>
    </MainLayout>
  )
}
