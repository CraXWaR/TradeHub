import express from "express";
import {getAllOrders, getUserOrders, placeOrder, updateOrderStatus} from "../controllers/orderController.js";
import {optionalAuth} from "../middleware/optionalAuth.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {orderValidator} from "../validators/orderValidator.js";

const router = express.Router();

router.post("/", optionalAuth, orderValidator, placeOrder);
router.get("/", getAllOrders);
router.get("/my-orders", authMiddleware, getUserOrders)
router.patch("/status/:id", authMiddleware, updateOrderStatus);

export default router;