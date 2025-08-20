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
    const notices = await db.collection("notices").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(notices)
  } catch (error) {
    console.error("Error fetching notices:", error)
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    if (!verifyAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, category, priority } = await request.json()

    const client = await clientPromise
    const db = client.db("school-website")

    const notice = {
      title,
      content,
      category,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("notices").insertOne(notice)

    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error("Error creating notice:", error)
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 })
  }
}
