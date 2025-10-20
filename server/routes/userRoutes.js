import express from "express";
import {getUsers, register, login, getMe, updateMe} from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);

// current user
router.get("/me", authMiddleware, getMe);
router.patch("/me", authMiddleware, updateMe);

export default router;
