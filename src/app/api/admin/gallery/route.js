import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import clientPromise from "@/lib/mongodb"
import { uploadImage } from "@/lib/cloudinary"

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
    const images = await db.collection("gallery").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(images)
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    if (!verifyAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const images = formData.getAll("images")
    const title = formData.get("title")
    const description = formData.get("description")
    const category = formData.get("category")

    if (images.length === 0) {
      return NextResponse.json({ error: "No images provided" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("school-website")
    const uploadedImages = []

    for (const image of images) {
      try {
        // Convert file to base64 for Cloudinary
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = `data:${image.type};base64,${buffer.toString("base64")}`

        // Upload to Cloudinary
        const cloudinaryResult = await uploadImage(base64, "school-gallery")

        // Save to database
        const imageDoc = {
          title: images.length === 1 ? title : `${title} ${uploadedImages.length + 1}`,
          description,
          category,
          url: cloudinaryResult.secure_url,
          publicId: cloudinaryResult.public_id,
          createdAt: new Date(),
        }

        const result = await db.collection("gallery").insertOne(imageDoc)
        uploadedImages.push({ ...imageDoc, _id: result.insertedId })
      } catch (uploadError) {
        console.error("Error uploading individual image:", uploadError)
        // Continue with other images even if one fails
      }
    }

    return NextResponse.json({
      success: true,
      uploaded: uploadedImages.length,
      total: images.length,
      images: uploadedImages,
    })
  } catch (error) {
    console.error("Error uploading images:", error)
    return NextResponse.json({ error: "Failed to upload images" }, { status: 500 })
  }
}
