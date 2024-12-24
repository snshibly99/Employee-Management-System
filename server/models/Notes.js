import mongoose from "mongoose";
import { Schema } from "mongoose";

const NoteSchema = new Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  note: { type: String, required: true },
  visibleToEmployee: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", NoteSchema);

export default Note;
