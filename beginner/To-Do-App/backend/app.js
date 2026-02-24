import express from "express";

const app = express();

// middlewares
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello Express");
});

export default app;
