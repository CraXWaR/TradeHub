import express from "express";
import {getUsers, register, login, getMe, updateMe} from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {validateRequest} from "../middleware/validateRequest.js";
import {registerValidation} from "../validators/registerValidation.js";
import {loginValidation} from "../validators/loginValidation.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);

// current user
router.get("/me", authMiddleware, getMe);
router.patch("/me", authMiddleware, updateMe);

export default router;
