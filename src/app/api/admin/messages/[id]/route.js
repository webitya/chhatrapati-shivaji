import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

async function verifyAdmin() {
  const authCookie = cookies().get("admin-auth")
  return authCookie && authCookie.value === "authenticated"
}

export async function PUT(request, { params }) {
  try {
    if (!verifyAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status } = await request.json()
    const { id } = params

    const client = await clientPromise
    const db = client.db("school-website")

    const result = await db.collection("messages").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!verifyAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    const client = await clientPromise
    const db = client.db("school-website")

    const result = await db.collection("messages").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
