import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("school-website")
    const images = await db.collection("gallery").find({}).sort({ createdAt: -1 }).toArray()

    // Return only public fields
    const publicImages = images.map((image) => ({
      id: image._id,
      title: image.title,
      description: image.description,
      category: image.category,
      url: image.url,
      createdAt: image.createdAt,
    }))

    return NextResponse.json(publicImages)
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 })
  }
}
