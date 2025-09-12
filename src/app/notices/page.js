"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Search } from "lucide-react"

export default function NoticesPage() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  // Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("/api/notices")
        if (res.ok) {
          const data = await res.json()
          setNotices(data)
        }
      } catch (error) {
        console.error("Error fetching notices:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchNotices()
  }, [])

  // Filter notices
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
      {/* Hero */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">School Notices</h1>
        <p className="text-white/90 max-w-2xl mx-auto">
          Stay updated with the latest announcements and important information
        </p>
      </section>

      {/* Search + Filter */}
      <section className="bg-gray-100 py-6 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          {/* Search Input */}
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                  filterCategory === category
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white border text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredNotices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">{notice.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{notice.content}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-4 border-t">
                  {/* ✅ Fixed date rendering */}
                  <span>
                    {new Date(notice.date || notice.createdAt).toLocaleDateString()}
                  </span>
                  <span className="capitalize">{notice.category}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No notices found matching your criteria.
            </p>
          </div>
        )}
      </section>
    </MainLayout>
  )
}
