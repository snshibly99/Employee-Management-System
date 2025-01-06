import mongoose from "mongoose";

const PerformanceSchema = new mongoose.Schema(
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
  { timestamps: true } 
);

const Performance = mongoose.model("Performance", PerformanceSchema);

export default Performance;

