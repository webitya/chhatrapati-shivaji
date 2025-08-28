import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("school") // change to your DB name
    const images = await db.collection("gallery").find({}).toArray()

    // Convert MongoDB _id to string
    const formatted = images.map(img => ({
      id: img._id.toString(),
      title: img.title,
      description: img.description,
      category: img.category,
      url: img.url,
    }))

    return new Response(JSON.stringify(formatted), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), { status: 500 })
  }
}
