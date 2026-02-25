import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("MongoDB connected successfully"),
    );
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "blog_app",
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
