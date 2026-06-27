import express from "express";
import {
    getProducts, createNewProduct, getProduct, getUserProducts, deleteProduct, editProduct, getDeleted, restoreProduct
} from "../controllers/productController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {upload} from "../middleware/uploadMiddleware.js";
import {isAdmin} from "../middleware/isAdminMiddleware.js";
import {productValidation} from "../validators/productValidator.js";
import {validateRequest} from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/create", authMiddleware, isAdmin, upload.single("image"), productValidation, validateRequest, createNewProduct);
router.get('/deleted', authMiddleware, isAdmin, getDeleted);

router.get("/user/:userId", getUserProducts);
router.get("/:id", getProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.put("/update/:id", authMiddleware, isAdmin, upload.single("image"), productValidation, validateRequest, editProduct);
router.patch('/:id/restore', authMiddleware, isAdmin, restoreProduct);

export default router;
