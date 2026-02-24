import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.types.ObjectId, require: true },
  name: { type: String, require: true },
  blogId: { type: mongoose.Schema.Types.ObjectId, require: true },
});

export const Likes = mongoose.model.likes ?? mongoose.model("like", likesSchema);
