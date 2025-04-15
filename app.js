import express from "express";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "welcome to postgress" });
});
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log("server is running on", port);
});
export default app;
