// src/app/api/admin/gallery/route.js
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// 📌 GET: Fetch all images
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("school") // change to your DB name
    const images = await db.collection("gallery").find().toArray()

    return new Response(JSON.stringify(images), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), { status: 500 })
  }
}

// 📌 POST: Save new image metadata
export async function POST(req) {
  try {
    const body = await req.json()
    const client = await clientPromise
    const db = client.db("school")

    const result = await db.collection("gallery").insertOne(body)

    return new Response(JSON.stringify(result), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to save image" }), { status: 500 })
  }
}
