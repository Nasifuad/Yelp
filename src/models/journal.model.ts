import mongoose, { Schema } from "mongoose";
import { IJournal } from "../Interface/User.interface";

const journalSchema = new mongoose.Schema<IJournal>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Journal = mongoose.model<IJournal>("Journal", journalSchema);
export default Journal;
