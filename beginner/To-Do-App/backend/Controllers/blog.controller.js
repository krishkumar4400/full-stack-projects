import errorMessage from "../utils/errorMessage.utils.js";
import { Blog } from "../Model/Blog.Model.js";
import { readFileSync } from "node:fs";
import imageKitClient from "../configs/imagekit.config.js";

export async function createBlog(req, res) {
  try {
    const { title, subTitle, description, category, isPublished } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
        success: false,
      });
    }

    const imageFile = req.file;

    const fileBuffer = readFileSync(imageFile.path);

    // upload image to imagekit
    const response = await imageKitClient.files.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogApp",
    });

    // optimize through imagekit URL transformation
    const optimizedImageURL = imageKitClient.url({
      path: response.filePath,
      transformations: [
        { quality: "auto" }, // auto compression
        { format: "webp" }, // convert to modern format
        { width: "1280" }, // width resizing
      ],
    });

    const thumbnailImage = optimizedImageURL;

    const blog = await Blog.create({
      title,
      subTitle,
      description,
      thumbnailImage,
      category,
      isPublished,
    });

    if (blog) {
      return res.status(201).json({
        message: "Blog created",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return errorMessage(req, res);
  }
}
