import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Image from "@/models/Image";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    const image = await Image.findById(id);
    if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Delete from DB
    await image.deleteOne();

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
