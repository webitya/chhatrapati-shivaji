
// models/Gallery.js
import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Academic", "Facilities", "Sports", "Arts", "Events", "Campus Life"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      public_id: {
        type: String,
        required: true, // Needed for deletion/update in Cloudinary
      },
      url: {
        type: String,
        required: true, // Display in frontend
      },
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
