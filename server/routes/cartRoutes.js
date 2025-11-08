import express from "express";
import {getCartItems} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCartItems);

export default router;