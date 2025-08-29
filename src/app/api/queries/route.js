import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("school-website")

    // ✅ Fetch last 10 queries
    const queries = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()

    const formatted = queries.map((q) => ({
      id: q._id.toString(),
      name: q.name,
      email: q.email,
      subject: q.subject,
      message: q.message,
      createdAt: q.createdAt,
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error("❌ Error fetching queries:", error)
    return NextResponse.json({ error: "Failed to fetch queries" }, { status: 500 })
  }
}
