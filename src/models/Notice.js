import mongoose from "mongoose"

const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    category: {
      type: String,
      enum: ["Academic", "Events", "General", "Safety"],
      default: "General",
    },
    priority: {
      type: String,
      enum: ["low", "normal", "high"],
      default: "normal",
    },
  },
  { timestamps: true }
)

// Avoid model overwrite error in Next.js
export default mongoose.models.Notice || mongoose.model("Notice", NoticeSchema)
