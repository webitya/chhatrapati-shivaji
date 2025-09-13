import mongoose from "mongoose"

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true }, // 👈 required for Cloudinary cleanup
  },
  { timestamps: true }
)

export default mongoose.models.Event || mongoose.model("Event", EventSchema)
