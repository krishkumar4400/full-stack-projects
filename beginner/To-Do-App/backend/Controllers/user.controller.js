import User from "../Model/User.Model.js";
import errorMessage from "../utils/errorMessage.utils.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export async function userRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing details",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashedPassowrd = await argon2.hash(password, {
      type: argon2.argon2id, // best variant
      memoryCost: 2 ** 16, // 64 MB
      timeCost: 3, // iterations
      parallelism: 1,
    });

    const user = await User.create({
      name,
      email,
      password: hashedPassowrd,
    });

    if (user) {
      const payload = {
        userId: user._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "development" ? "strict" : "lax",
        })
        .status(201)
        .json({
          message: "You are registered successfully",
          success: true,
        });
    }
  } catch (error) {
    console.error(error);
    return errorMessage(req, res);
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "Incorrect email or passoword",
        success: false,
      });
    }

    const isMatch = await argon2.verify(existingUser.password, password);

    if (!isMatch) {
      return res.status(404).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const payload = {
      userId: existingUser._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .cookie("token", token, {
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "development" ? "strict" : "lax",
      })
      .status(200)
      .json({
        message: "You are now logged in",
        success: true,
      });
  } catch (error) {
    console.error(error);
    return errorMessage(req, res);
  }
}

export async function logout(req, res) {
  try {
    return res.clearCookie("token").status(200).json({
      message: "You are logged out",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorMessage(req, res);
  }
}

export async function sendVerifyOTP(req, res) {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        message: "Unauthenticated",
        success: false,
      });
    }

    const otp = Math.random();

    user.verifyOTP = otp;
    user.verifyOTPExpireAt = Date.now() + 5 * 60 * 1000;

    await user.save();
  } catch (error) {
    console.error(error);
    return errorMessage();
  }
}

export async function sendResetOTP(req, res) {
  try {
  } catch (error) {
    console.error(error);
    return errorMessage();
  }
}
