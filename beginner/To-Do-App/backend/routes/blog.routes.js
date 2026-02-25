import { Router } from "express";
import { createBlog } from "../Controllers/blog.controller.js";
import upload from "../middlewares/multer.js";


const blogRouter = Router();

blogRouter.post('/add', upload.single('image'), createBlog);

export default blogRouter;