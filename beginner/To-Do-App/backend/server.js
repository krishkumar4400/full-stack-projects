import "dotenv/config";
import http from "http";
import app from "./app.js";
import connectDB from "./configs/mongoDB.js";

await connectDB();

const port = process.env.PORT ?? 8001;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});
