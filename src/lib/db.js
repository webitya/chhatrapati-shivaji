// lib/db.js
import mongoose from "mongoose";

let isConnected = false; // Global connection state

export default async function dbConnect() {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("⚠️ Please add MONGODB_URI to your .env.local file");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "school", // 👈 use your database name here
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected:", db.connections[0].name);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
