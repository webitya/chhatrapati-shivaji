import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export async function DELETE(req, { params }) {
  try {
    const client = await clientPromise
    const db = client.db("shivaji_project")

    const result = await db.collection("events").deleteOne({
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Event deleted successfully" })
  } catch (error) {
    console.error("❌ Error deleting event:", error)
    return NextResponse.json({ message: "Failed to delete event" }, { status: 500 })
  }
}
