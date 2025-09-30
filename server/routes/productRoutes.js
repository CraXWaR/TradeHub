import express from "express";
import {
    getProducts, createNewProduct, getProduct, getUserProducts, deleteProduct, editProduct
} from "../controllers/productController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {upload} from "../middleware/uploadMiddleware.js";
import {isAdmin} from "../middleware/isAdminMiddleware.js";
import {productValidation} from "../validators/productValidator.js";
import {validateRequest} from "../middleware/validateRequest.js";

const router = express.Router();

// GET /api/products - Get all products
router.get("/", getProducts);

// POST /api/products - Create a new product
router.post("/create", authMiddleware, isAdmin, upload.single("image"), productValidation, validateRequest, createNewProduct);

// GET /api/products/user/:userId - Get all products by a specific user
router.get("/user/:userId", getUserProducts);

// GET /api/products/:id - Get a specific product by ID
router.get("/:id", getProduct);

// DELETE /api/products/:id - Delete a specific product by ID
router.delete("/:id", authMiddleware, deleteProduct);

// Update /api/products/:id - Update a specific product by ID
router.put("/update/:id", authMiddleware, isAdmin, upload.single("image"), productValidation, validateRequest, editProduct);

export default router;
