import { NextResponse } from "next/server"
import { sendThankYouEmail, sendLeadEmail } from "@/lib/nodemailer"
import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Prepare lead data
    const leadData = {
      name,
      email,
      phone: phone || "Not provided",
      subject,
      message,
      createdAt: new Date(),
      status: "unread",
    }

    const client = await clientPromise
    const db = client.db("school-website")
    await db.collection("messages").insertOne(leadData)

    // Send emails
    await Promise.all([sendThankYouEmail(email, name), sendLeadEmail(leadData)])

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in contact API:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
