import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "school-gallery" },
          (error, result) => (error ? reject(error) : resolve(result))
        )
        .end(buffer)
    })

    return NextResponse.json(uploadResult)
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
