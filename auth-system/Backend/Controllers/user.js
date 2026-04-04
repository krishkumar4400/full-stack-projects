import { User } from "../Model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../Config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../Config/emailTemplates.js";

//  user register function
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      message: "Missing Details",
      success: false,
    });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // user = await User.create({
    //   name,
    //   email,
    //   password,
    // });
    user = await new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // sending welcome email
    const sendWelcomeEmail = async (email) => {
      try {
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: "Welcome Email",
          text: `Welcome to our platform. Your account has been created with email id: ${email}`,
          html: "",
        };
        await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully");
      } catch (error) {
        console.error(`Error while sending welcome email: ${error.message}`);
      }
    };
    sendWelcomeEmail(email);

    return res.json({
      message: "User Registered successfully",
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

// user login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      message: "Email and Password are required",
      success: false,
    });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    let validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const sendLoginNotification = async (email) => {
      try {
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: "Login Notification",
          text: `Someone just logged in with ${email}`,
        };
        await transporter.sendMail(mailOptions);
        console.log(`Login notification sent to the ${email}`);
      } catch (error) {
        console.error(`Error while sending Email: ${error.message}`);
      }
    };
    sendLoginNotification(email);

    return res.json({
      message: `Welcome back ${user.name}`,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

// logout function:
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({
      message: "Logged out",
      success: true,
    });
  } catch (error) {
    console.error(`Error while Logout: ${error.message}`);
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

// User Email Verification
export const sendVerifyOTP = async (req, res) => {
  try {
    const { userId } = req.body;
    let user = await User.findById(userId);

    if (user.isAccountVerified) {
      return res.json({
        message: "Account Already verified",
        success: false,
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOTP = otp;
    user.verifyOTPExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      // text: `Your OTP is ${otp}. Verify your account using this OTP`,
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
      // html: ""
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      message: "Verification OTP Sent on Email",
      success: true,
    });
  } catch (error) {
    return res.send({
      message: error.message,
      success: false,
    });
  }
};

//verify the email using the otp
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({
      message: "Missing Details",
      success: false,
    });
  }

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.json({
        message: "User Not Found",
        success: false,
      });
    }

    if (user.verifyOTP === "" || otp !== user.verifyOTP) {
      return res.json({
        message: "Invalid OTP",
        success: false,
      });
    }

    if (user.verifyOTPExpireAt < Date.now()) {
      return res.json({
        message: "OTP Expired",
        success: false,
      });
    }

    user.isAccountVerified = true;
    user.verifyOTPExpireAt = 0;
    user.verifyOTP = "";
    await user.save();

    return res.json({
      message: "Email verified Successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

// check if user is user Authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

// send reset password otp
export const sendResetPasswordOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      message: "Email is Required",
      success: false,
    });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User Not Found",
        success: false,
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetPasswordOTP = otp;
    user.resetOTPExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Reset Password OTP",
      // text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", email)
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      message: "Reset OTP sent to your Email",
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// reset user password OTP
export const verifyResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    if (!email || !otp || !newPassword) {
      return res.json({
        message: "Email, OTP and new password are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User Not Found",
        success: false,
      });
    }
    if (user.resetPasswordOTP === "" || otp !== user.resetPasswordOTP) {
      return res.json({
        message: "Invalid OTP",
        success: false,
      });
    }

    if (user.resetOTPExpireAt < Date.now()) {
      return res.json({
        message: "OTP Expires",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOTPExpireAt = 0;
    user.resetPasswordOTP = "";
    await user.save();
    return res.json({
      message: "Password has been reset Successfully",
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// change password
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, userId } = req.body;

  try {
    if (!oldPassword || !newPassword) {
      return res.json({
        message: "Missing Details",
        success: false,
      });
    }

    let user = await User.findById(userId);

    if (!user) {
      return res.json({
        message: "Unauthorized Login Again",
        success: false,
      });
    }

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.json({
        message: "Wrong Password",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.json({
      message: "Your Password has been Changed",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};