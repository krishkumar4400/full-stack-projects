import jwt from "jsonwebtoken";

export const generateToken = async (userId) => {
  try {
    return jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
  } catch (error) {
    console.error(error);
  }
};
