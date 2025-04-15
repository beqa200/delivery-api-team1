import express from "express";
import {
  createUser,
  getUsers,
  signIn,
  updateUser,
} from "../controllers/userController.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(auth, isAdmin, getUsers).post(auth, isAdmin, createUser);
router.route("/:id").put(auth, isAdmin, updateUser);

router.route("/signIn").post(signIn);

export default router;
