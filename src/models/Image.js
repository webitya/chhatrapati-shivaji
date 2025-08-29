import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    category: { type: String, default: "ALL" }, // optional filter field
  },
  { timestamps: true }
);

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
