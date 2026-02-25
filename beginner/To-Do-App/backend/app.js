import express from "express";
import userRouter from "./routes/user.routes.js";
import helmet from 'helmet';
import blogRouter from "./routes/blog.routes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  return res.send("Hello Express");
});

// user middleware
app.use('/api/user', userRouter);
app.use(express.urlencoded({extended: true}));

// blog middleware
app.use('/api/blog', blogRouter);

export default app;
