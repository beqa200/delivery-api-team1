import express from "express";
import {
  changeCourier,
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { auth, isAdmin, isAdminOrCourier } from "../middlewares/auth.js";

const router = express.Router();
router.route("/").get(auth, getOrders).post(auth, createOrder);
router.route("/:id/status").put(auth, isAdminOrCourier, updateOrderStatus);
router.route("/:id/courier").put(auth, isAdmin, changeCourier);
router
  .route("/:id")
  .get(auth, isAdminOrCourier, getOrderById)
  .put(auth, isAdmin, updateOrder)
  .delete(auth, isAdmin, deleteOrder);
export default router;
