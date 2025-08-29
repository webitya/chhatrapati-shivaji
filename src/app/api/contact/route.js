import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    // ✅ Save to MongoDB
    const client = await clientPromise
    const db = client.db("school-website")
    const result = await db.collection("contacts").insertOne({
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date(),
    })

    console.log("📥 Contact saved to DB:", result.insertedId)

    // ✅ Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail address
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    })

    // ✅ Thank-you email to user
    await transporter.sendMail({
      from: `"${process.env.SCHOOL_NAME || "School Support"}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting us, We eill respond you shortly",
      text: `Hello ${name},

Thank you for reaching out to us. We have received your message regarding "${subject}".
Our team will get back to you shortly.

Best regards,  
Chhatrapati Shivaji +2 High School`,
    })

    console.log("📧 Auto-reply sent to:", email)

    // ✅ Notification email to admin
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📬 New Contact Form Submission: ${subject}`,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Subject: ${subject}
Message: ${message}

📅 Submitted At: ${new Date().toLocaleString()}
      `,
    })

    console.log("📨 Admin notified:", process.env.EMAIL_USER)

    // ✅ Send success response for frontend
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("❌ Error in /api/contact:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
