import dotenv from "dotenv";
import express from "express";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "welcome to postgress" });
});
app.use("/api/orders", orderRoutes);

app.listen(port, () => {
  console.log("server is running on", port);
});
