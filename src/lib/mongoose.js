import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI in .env.local")
}

let isConnected = false

export default async function connectMongoose() {
  if (isConnected) {
    console.log("🔄 Using existing Mongoose connection")
    return
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true
    console.log("✅ Connected to MongoDB with Mongoose")
  } catch (err) {
    console.error("🚨 Mongoose connection error:", err)
    throw err
  }
}
