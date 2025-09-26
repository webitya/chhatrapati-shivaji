import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("school")
    const events = await db.collection("events").find({}).sort({ date: -1 }).toArray()

    const formatted = events.map(ev => ({
      id: ev._id.toString(),
      title: ev.title,
      description: ev.description,
      date: ev.date,
      imageUrl: ev.imageUrl,
      publicId: ev.publicId,
    }))

    return new Response(JSON.stringify(formatted), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json() // now safe because frontend sends JSON
    const client = await clientPromise
    const db = client.db("school")
    const result = await db.collection("events").insertOne(body)
    return new Response(JSON.stringify({ ...body, id: result.insertedId.toString() }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Failed to save event" }), { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const client = await clientPromise
    const db = client.db("school")
    await db.collection("events").deleteOne({ _id: new ObjectId(params.id) })
    return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Failed to delete event" }), { status: 500 })
  }
}
