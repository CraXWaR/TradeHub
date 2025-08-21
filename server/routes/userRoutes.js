import express from "express";
import {getUsers, register} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", register);

export default router;
