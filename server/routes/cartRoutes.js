import express from "express";
import {
    addToCart,
    clearUserCart,
    getCartItems,
    removeFromCart,
    updateQuantity,
    updateVariant
} from "../controllers/cartController.js";
import {verifyCartToken} from "../middleware/verifyCartToken.js";

const router = express.Router();

router.get("/", verifyCartToken, getCartItems);
router.post("/", verifyCartToken, addToCart);
router.delete("/remove", verifyCartToken, removeFromCart);
router.delete("/clear", verifyCartToken, clearUserCart);
router.patch("/update-quantity", verifyCartToken, updateQuantity);
router.patch("/update-variant", verifyCartToken, updateVariant);

export default router;