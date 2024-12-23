import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

export default Announcement;
