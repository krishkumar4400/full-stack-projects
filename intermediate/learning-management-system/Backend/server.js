import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./Controllers/webhooks.js";
import educatorRouter from "./Routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";

// initialize express
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(clerkMiddleware());
app.use(cors());

// connect to database
await connectDB();

// routes
app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.post("/clerk", clerkWebhooks);
app.use("/api/educator", educatorRouter);

// port
const port = process.env.PORT || 4000;

// running server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
