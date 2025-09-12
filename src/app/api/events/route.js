import dbConnect from "@/lib/db"
import Event from "@/models/Event"

export async function GET() {
  await dbConnect()
  const events = await Event.find().sort({ date: -1 })
  return Response.json(events)
}

export async function POST(req) {
  await dbConnect()
  const { title, date, description, imageUrl } = await req.json()

  const newEvent = await Event.create({
    title,
    date,
    description,
    imageUrl,
  })

  return Response.json(newEvent, { status: 201 })
}
