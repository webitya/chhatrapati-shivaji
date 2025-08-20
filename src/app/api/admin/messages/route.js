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
    const messages = await db.collection("messages").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}
