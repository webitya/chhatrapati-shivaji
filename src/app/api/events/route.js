import dbConnect from "@/lib/db"
import Event from "@/models/Event"
import { NextResponse } from "next/server"

// GET all events
export async function GET() {
  try {
    await dbConnect()
    const events = await Event.find().sort({ date: -1 })
    return NextResponse.json(events, { status: 200 })
  } catch (error) {
    console.error("❌ Error fetching events:", error)
    return NextResponse.json({ message: "Failed to fetch events" }, { status: 500 })
  }
}

// POST new event
export async function POST(request) {
  try {
    await dbConnect()
    const body = await request.json()
    console.log("Incoming event data:", body)

    const { title, date, description, imageUrl, publicId } = body
    if (!title || !date || !description || !imageUrl || !publicId) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const event = new Event({ title, date, description, imageUrl, publicId })
    const saved = await event.save()

    return NextResponse.json(saved, { status: 201 })
  } catch (error) {
    console.error("❌ Error saving event:", error)
    return NextResponse.json({ message: "Failed to save event" }, { status: 500 })
  }
}
