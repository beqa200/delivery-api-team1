import express from "express";
import {
  changeCourier,
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
  updateOrderStatus,
  uploadOrderExcel,
} from "../controllers/orderController.js";
import {
  auth,
  isAdmin,
  isAdminOrCourier,
  isAdminOrStore,
} from "../middlewares/auth.js";
import upload from "../middlewares/uploadFIle.js";

const router = express.Router();
router.route("/").get(auth, getOrders).post(auth, createOrder);
router.route("/:id/status").put(auth, isAdminOrCourier, updateOrderStatus);
router.route("/:id/courier").put(auth, isAdmin, changeCourier);
router
  .route("/:id")
  .get(auth, isAdminOrCourier, getOrderById)
  .put(auth, isAdminOrStore, updateOrder)
  .delete(auth, isAdminOrStore, deleteOrder);
router
  .route("/upload-order-excel")
  .post(auth, isAdminOrStore, upload.single("orders"), uploadOrderExcel);
export default router;
