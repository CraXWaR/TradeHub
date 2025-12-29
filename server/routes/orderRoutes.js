import express from "express";
import {placeOrder} from "../controllers/orderController.js";
import {optionalAuth} from "../middleware/optionalAuth.js";

const router = express.Router();

router.post("/", optionalAuth, placeOrder)

export default router;