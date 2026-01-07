import express from "express";
import {getAllOrders, getUserOrders, placeOrder} from "../controllers/orderController.js";
import {optionalAuth} from "../middleware/optionalAuth.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {orderValidator} from "../validators/orderValidator.js";

const router = express.Router();

router.post("/", optionalAuth, orderValidator, placeOrder);
router.get("/", getAllOrders);
router.get("/my-orders", authMiddleware, getUserOrders)

export default router;