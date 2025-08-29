import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

// ✅ Get all messages
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("school-website")
    const messages = await db.collection("contacts").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(messages)
  } catch (error) {
    console.error("❌ Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}
