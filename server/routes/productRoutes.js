import express from "express";
import { getProducts, createNewProduct, getProduct, getUserProducts, deleteProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// GET /api/products - Get all products
router.get("/", getProducts);

// POST /api/products - Create a new product
router.post("/create", authMiddleware, upload.single("image"), createNewProduct);

// GET /api/products/user/:userId - Get all products by a specific user
router.get("/user/:userId", getUserProducts);

// GET /api/products/:id - Get a specific product by ID
router.get("/:id", getProduct);

// DELETE /api/products/:id - Delete a specific product by ID
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
