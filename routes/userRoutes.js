import express from "express";
import { createUser, getUsers, signIn } from "../controllers/userController.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(getUsers).post(auth, isAdmin, createUser);
router.route("/signIn").post(signIn);

export default router;
