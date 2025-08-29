import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("school-website")

    // ✅ Count stats from collections
    const totalNotices = await db.collection("notices").countDocuments()
    const totalImages = await db.collection("gallery").countDocuments()   // <-- ensure collection name is correct
    const totalMessages = await db.collection("contacts").countDocuments()
    const totalUsers = await db.collection("users").countDocuments()

    // ✅ Example recent activity (last 5 notices/messages)
    const recentActivity = await db
      .collection("notices")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray()

    const formattedActivity = recentActivity.map((item) => ({
      action: `Notice added: ${item.title}`,
      timestamp: new Date(item.createdAt).toLocaleString(),
    }))

    return NextResponse.json({
      stats: {
        totalNotices,
        totalImages,
        totalMessages,
        totalUsers,
      },
      recentActivity: formattedActivity,
    })
  } catch (error) {
    console.error("❌ Dashboard API Error:", error)
    return NextResponse.json({ error: "Failed to load dashboard data" }, { status: 500 })
  }
}
