import { Admin } from "../Model/Admin.Model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import Blog from "../Model/Blog.Model.js";
import { Comment } from "../Model/Comments.Model.js";
import errorMessage from "../utils/errorMessage.utils.js";
import { Likes } from "../Model/Likes.Model.js";

export async function adminRegister(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin with this email already exists",
        success: false,
      });
    }

    const hashedPassword = await argon2.hash(password);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    const payload = { adminId: admin._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(201)
      .cookies("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "development" ? "strict" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "You are registered successfully",
        success: true,
      });
  } catch (error) {
    console.error(error);
    return errorMessage(req, res);
  }
}

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isMatch = await argon2.compare(password, existingAdmin.password);

    if (!isMatch) {
      return res.status(404).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const payload = { adminId: existingAdmin._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).cookies("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60,
    });
  } catch (error) {
    console.error(error.message);
    return errorMessage(req, res);
  }
}

export async function removeAdmin(req, res) {
  try {
    const { adminId } = req.params;
    if (!adminId) {
      return res.status(400).json({
        message: "Admin id is required",
        success: false,
      });
    }

    await Admin.findByIdAndDelete(adminId);

    return res.status(200).json({
      message: "Admin removed successfully",
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return errorMessage(req, res);
  }
}

export async function adminLogout(req, res) {
  try {
    return res.status(200).clearCookie("token").json({
      message: "You are logged out",
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return errorMessage(req, res);
  }
}

export async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error(error);
    return errorMessage(req, res);
  }
}

export async function getBlogComments(req, res) {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return res.status(400).json({
        message: "Comment id is required",
        success: false,
      });
    }

    const comments = await Comment.find({ blogId });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error(error);
    return errorMessage(req, res);
  }
}

export async function getAllComments(req, res) {
  try {
    const comments = await Comment.find()
      .populate("blog")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error(error);
    return errorMessage(req, res);
  }
}

export async function getBlogById(req, res) {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return res.status(400).json({
        message: "Blog id is required",
        success: false,
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error(error);
    return errorMessage(req, res);
  }
}

export async function getLikesOnBlog(req, res) {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return res.status(400).json({
        message: "Blog id is required",
        success: false,
      });
    }

    const likes = await Likes.find({ blogId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      likes,
    });
  } catch (error) {
    console.error(error);
    return errorMessage();
  }
}
