import express from "express";
import { getProducts, createNewProduct, getProduct, getUserProducts } from "../controllers/productController.js";
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

export default router;
