import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import clientPromise from "@/lib/mongodb"

async function verifyAdmin() {
  const authCookie = cookies().get("admin-auth")
  return authCookie && authCookie.value === "authenticated"
}

export async function GET() {
  try {
    if (!verifyAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("school-website")

    // Get stats
    const [noticesCount, imagesCount, messagesCount] = await Promise.all([
      db.collection("notices").countDocuments(),
      db.collection("gallery").countDocuments(),
      db.collection("messages").countDocuments(),
    ])

    // Get recent activity (sample data)
    const recentActivity = [
      { action: "New notice created: Winter Break Schedule", timestamp: "2 hours ago" },
      { action: "Gallery image uploaded: Science Fair", timestamp: "4 hours ago" },
      { action: "New message received from parent", timestamp: "6 hours ago" },
      { action: "Notice updated: Parent-Teacher Conference", timestamp: "1 day ago" },
    ]

    return NextResponse.json({
      stats: {
        totalNotices: noticesCount,
        totalImages: imagesCount,
        totalMessages: messagesCount,
        totalUsers: 1, // Simple admin system
      },
      recentActivity,
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
