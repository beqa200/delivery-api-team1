import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(auth, getOrders).post(createOrder);

export default router;
