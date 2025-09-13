import cloudinary from "cloudinary"
import { NextResponse } from "next/server"
import { IncomingForm } from "formidable"
import fs from "fs"

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req) {
  try {
    const form = new IncomingForm()
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        resolve({ fields, files })
      })
    })

    const file = data.files.file[0].filepath

    const result = await cloudinary.v2.uploader.upload(file, {
      folder: "events",
    })

    // remove temp file
    fs.unlinkSync(file)

    return NextResponse.json(
      {
        secure_url: result.secure_url,
        public_id: result.public_id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 })
  }
}
