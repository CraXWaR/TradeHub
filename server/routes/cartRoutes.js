import express from "express";
import {
    addToCart,
    clearUserCart,
    getCartItems,
    removeFromCart,
    updateQuantity,
    updateVariant
} from "../controllers/cartController.js";
import {optionalAuth} from "../middleware/optionalAuth.js";

const router = express.Router();

router.get("/", optionalAuth, getCartItems);
router.post("/", optionalAuth, addToCart);
router.delete("/remove", optionalAuth, removeFromCart);
router.delete("/clear", optionalAuth, clearUserCart);
router.patch("/update-quantity", optionalAuth, updateQuantity);
router.patch("/update-variant", optionalAuth, updateVariant);

export default router;