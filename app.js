import express from "express";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerUI from "swagger-ui-express";
import specs from "./models/swagger.js";
const app = express();

app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.get("/", (req, res) => {
  res.json({ message: "welcome to postgress" });
});
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

export default app;
