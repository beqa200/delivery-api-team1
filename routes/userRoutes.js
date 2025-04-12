import express from "express";
import { getUsers, signIn } from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/signIn").post(signIn);

export default router;
