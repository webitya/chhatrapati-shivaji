import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Image from "@/models/Image";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  let query = {};
  if (category && category !== "ALL") query = { category };

  const images = await Image.find(query).sort({ createdAt: -1 });
  return NextResponse.json(images);
}
