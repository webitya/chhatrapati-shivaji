import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("shivaji_project") // change db name if needed
    const events = await db.collection("events").find().toArray()

    return NextResponse.json(events)
  } catch (error) {
    console.error("❌ Error fetching events:", error)
    return NextResponse.json({ message: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const client = await clientPromise
    const db = client.db("shivaji_project")

    const result = await db.collection("events").insertOne(body)

    return NextResponse.json({ _id: result.insertedId, ...body })
  } catch (error) {
    console.error("❌ Error creating event:", error)
    return NextResponse.json({ message: "Failed to create event" }, { status: 500 })
  }
}
