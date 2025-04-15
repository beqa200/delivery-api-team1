import express from "express";
import {
  createOrder,
  getOrders,
  updateOrder,
} from "../controllers/orderController.js";
import { auth, isAdminOrCourier } from "../middlewares/auth.js";

const router = express.Router();
router.route("/").get(auth, getOrders).post(auth, createOrder);
router.route("/:id/status").put(auth, isAdminOrCourier, updateOrder);

export default router;
