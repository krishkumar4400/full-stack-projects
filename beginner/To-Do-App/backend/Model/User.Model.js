import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    isVerified: { type: String, default: false },
    verifyOTP: { type: String, default: "" },
    verifyOTPExpireAt: { type: Date, default: Date.now() },
    resetOTP: { type: String, default: "" },
    resetOTPExpireAt: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model.users ?? mongoose.model("user", userSchema);

export default User;
