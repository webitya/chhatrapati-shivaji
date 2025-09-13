import dbConnect from "@/lib/db"
import Event from "@/models/Event"
import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function DELETE(request, { params }) {
  const { id } = params

  try {
    await dbConnect()
    const event = await Event.findById(id)

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    // 1️⃣ Delete Cloudinary image
    if (event.publicId) {
      try {
        await cloudinary.uploader.destroy(event.publicId)
        console.log("🖼️ Cloudinary image deleted:", event.publicId)
      } catch (cloudErr) {
        console.error("❌ Failed to delete Cloudinary image:", cloudErr)
      }
    }

    // 2️⃣ Delete event from DB
    await Event.findByIdAndDelete(id)
    console.log("✅ Event deleted from MongoDB:", id)

    return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("❌ Error deleting event:", error)
    return NextResponse.json({ message: "Failed to delete event" }, { status: 500 })
  }
}
