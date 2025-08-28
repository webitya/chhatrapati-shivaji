// src/app/api/gallery/upload/route.js
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/db";
import Gallery from "@/models/Gallery";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  await dbConnect();

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    const category = formData.get("category");
    const description = formData.get("description");

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadRes = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "school-gallery" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    // Save in MongoDB
    const newImage = await Gallery.create({
      title,
      category,
      description,
      image: {
        public_id: uploadRes.public_id,
        url: uploadRes.secure_url,
      },
    });

    return NextResponse.json({ success: true, data: newImage });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
