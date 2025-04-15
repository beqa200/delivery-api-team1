import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
const port = 3000;
app.listen(port, () => {
  console.log("server is running on", port);
});
