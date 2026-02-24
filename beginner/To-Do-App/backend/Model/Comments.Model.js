import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.types.ObjectId, require: true },
  name: { type: String, require: true },
  comment: { type: String, require: true },
  blogId: { type: mongoose.Schema.Types.ObjectId, require: true },
  isApproved: { type: Boolean, default: false, require: true },
  date: { type: Date, default: Date.now() },
});

export const Comment =
  mongoose.model.comments ?? mongoose.model("comment", commentSchema);
