// src/app/api/admin/gallery/[id]/route.js
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import cloudinary from "cloudinary"

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function DELETE(req, { params }) {
  try {
    const { id } = params
    const { searchParams } = new URL(req.url)
    const publicId = searchParams.get("publicId")

    const client = await clientPromise
    const db = client.db("school")

    // 1️⃣ Delete from Cloudinary
    if (publicId) {
      await cloudinary.v2.uploader.destroy(publicId)
    }

    // 2️⃣ Delete from MongoDB
    await db.collection("gallery").deleteOne({ _id: new ObjectId(id) })

    return new Response(JSON.stringify({ message: "Image deleted successfully" }), { status: 200 })
  } catch (error) {
    console.error("Delete error:", error)
    return new Response(JSON.stringify({ error: "Failed to delete image" }), { status: 500 })
  }
}
