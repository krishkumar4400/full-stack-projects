import { Router } from "express";
import {
    changePassword,
  isAuthenticated,
  login,
  logout,
  register,
  sendResetPasswordOTP,
  sendVerifyOTP,
  verifyEmail,
  verifyResetPassword,
} from "../Controllers/user.js";
import userAuth from "../Middleware/userAuth.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.post("/send-verify-otp", userAuth, sendVerifyOTP);

router.post("/verify-account", userAuth, verifyEmail);

router.get("/is-auth", userAuth, isAuthenticated);

router.post("/send-reset-otp", sendResetPasswordOTP);

router.post("/reset-password", verifyResetPassword);

router.post("/change-password",userAuth, changePassword);

export default router;
