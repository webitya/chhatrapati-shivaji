import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

// GET all notices (public)
export async function GET() {
  try {
    console.log("📡 Public API /api/notices called")

    const client = await clientPromise
    const db = client.db("school-website") // ✅ Make sure DB is correct

    const notices = await db
      .collection("notices")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    console.log(`📥 Public notices fetched: ${notices.length}`)
    return NextResponse.json(notices)
  } catch (error) {
    console.error("❌ Error fetching public notices:", error)
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 })
  }
}
