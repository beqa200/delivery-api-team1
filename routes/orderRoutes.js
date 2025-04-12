import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").get(getOrders).post(createOrder);

export default router;
