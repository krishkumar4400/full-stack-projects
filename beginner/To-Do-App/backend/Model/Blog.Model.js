import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    subTitle: { type: String, default: "" },
    description: { type: String, require: true },
    thumbnailImage: { type: String, require: true },
    category: { type: String, require: true },
    isPublished: { type: Boolean, require: true },
  },
  {
    timestamps: true,
  },
);

const Blog = mongoose.model.blogs || mongoose.model("blog", blogSchema);
export default Blog;
