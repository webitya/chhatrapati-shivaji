import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import cloudinary from "@/lib/cloudinary"
import { ObjectId } from "mongodb"

export async function DELETE(req, { params }) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: "Missing event ID" }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db("school")
    const events = db.collection("events")

    // Find the event to get publicId
    const event = await events.findOne({ _id: new ObjectId(id) })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Delete image from Cloudinary
    if (event.publicId) {
      await cloudinary.uploader.destroy(event.publicId)
    }

    // Delete event from MongoDB
    await events.deleteOne({ _id: new ObjectId(id) })

    return NextResponse.json({ message: "Event deleted successfully" })
  } catch (error) {
    console.error("Error deleting event:", error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}
