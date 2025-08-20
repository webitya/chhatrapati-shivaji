import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { deleteImage } from "@/lib/cloudinary"

async function verifyAdmin() {
  const authCookie = cookies().get("admin-auth")
  return authCookie && authCookie.value === "authenticated"
}

export async function DELETE(request, { params }) {
  try {
    if (!verifyAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const { publicId } = await request.json()

    const client = await clientPromise
    const db = client.db("school-website")

    // Delete from Cloudinary
    if (publicId) {
      try {
        await deleteImage(publicId)
      } catch (cloudinaryError) {
        console.error("Error deleting from Cloudinary:", cloudinaryError)
        // Continue with database deletion even if Cloudinary fails
      }
    }

    // Delete from database
    const result = await db.collection("gallery").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting image:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
