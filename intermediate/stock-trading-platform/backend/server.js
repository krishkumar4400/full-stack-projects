import "dotenv/config";
import app from "./src/app.js";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});
