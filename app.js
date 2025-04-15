import express from "express";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "welcome to postgress" });
});
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

export default app;
