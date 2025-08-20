"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import StatsCard from "@/components/ui/stats-card"
import { FileText, ImageIcon, Mail, Users, TrendingUp, Calendar } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalNotices: 0,
    totalImages: 0,
    totalMessages: 0,
    totalUsers: 0,
  })
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard")
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setRecentActivity(data.recentActivity)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard number={stats.totalNotices} label="Total Notices" icon={FileText} color="primary" />
          <StatsCard number={stats.totalImages} label="Gallery Images" icon={ImageIcon} color="secondary" />
          <StatsCard number={stats.totalMessages} label="Messages" icon={Mail} color="accent" />
          <StatsCard number={stats.totalUsers} label="Admin Users" icon={Users} color="primary" />
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <h2 className="font-serif font-semibold text-xl text-foreground flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <h2 className="font-serif font-semibold text-xl text-foreground flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Quick Actions
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Add Notice</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/5 border-secondary/20 hover:bg-secondary/10 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <ImageIcon className="h-8 w-8 text-secondary mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Upload Image</p>
                  </CardContent>
                </Card>
                <Card className="bg-accent/5 border-accent/20 hover:bg-accent/10 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Mail className="h-8 w-8 text-accent mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">View Messages</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Manage Users</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
