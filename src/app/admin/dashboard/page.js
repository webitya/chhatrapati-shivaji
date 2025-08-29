"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import StatsCard from "@/components/ui/stats-card"
import { FileText, ImageIcon, Mail, Users, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalNotices: 0,
    totalImages: 0,
    totalMessages: 0,
    totalUsers: 0,
  })
  const [recentMessages, setRecentMessages] = useState([])

  useEffect(() => {
    fetchDashboardData()
    fetchRecentMessages()
  }, [])

  // ✅ Stats (Notices, Images, Messages, Users)
  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard")
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  // ✅ Fetch Recent Messages
  const fetchRecentMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages")
      if (response.ok) {
        const data = await response.json()
        setRecentMessages(data)
      }
    } catch (error) {
      console.error("Error fetching recent messages:", error)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif font-bold text-3xl text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of your school management system</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard number={stats.totalNotices} label="Total Notices" icon={FileText} color="primary" />
          <StatsCard number={stats.totalImages} label="Gallery Images" icon={ImageIcon} color="secondary" />
          <StatsCard number={stats.totalMessages} label="Messages" icon={Mail} color="accent" />
          {/* <StatsCard number={stats.totalUsers} label="Admin Users" icon={Users} color="primary" /> */}
        </div>

        {/* Recent Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <h2 className="font-serif font-semibold text-xl text-foreground flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Recent Messages
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.length > 0 ? (
                  recentMessages.map((msg, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium">
                          {msg.name} ({msg.email})
                        </p>
                        <p className="text-sm text-muted-foreground">Subject: {msg.subject}</p>
                        <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No recent messages</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
