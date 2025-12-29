import {
    createProduct, deleteProductById, getAllProducts, getProductById, getProductsByUserId, updateProduct
} from "../services/productService.js";
import fs from "fs/promises";
import {FRIENDLY_MESSAGES} from "../utils/messages.js";

export const getProducts = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.json({
            success: true, message: FRIENDLY_MESSAGES[200], count: products.length, data: products,
        });
    } catch (error) {
        next(error);
    }
};

export const createNewProduct = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            const error = new Error("Forbidden");
            error.status = 403;
            throw error;
        }

        const {title, description, price, image, variants} = req.body;
        const user_id = req.user.id;

        let imageUrl = req.file ? req.file.filename : image;

        if (!imageUrl) {
            const error = new Error("invalid: Image is required");
            error.status = 400;
            throw error;
        }

        let normalizedVariants = [];
        if (variants) {
            normalizedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;
        }

        const productData = {
            user_id,
            title: title?.trim(),
            description: description?.trim(),
            price: parseFloat(price),
            image: imageUrl,
            variants: normalizedVariants
        };

        const newProduct = await createProduct(productData);

        res.status(201).json({
            success: true, message: FRIENDLY_MESSAGES[201], data: newProduct,
        });
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await getProductById(id);

        if (!product) {
            const error = new Error("Product not found");
            error.status = 404;
            throw error;
        }

        res.json({
            success: true, data: product,
        });
    } catch (error) {
        if (req.file) await fs.unlink(req.file.path).catch(() => {
        });
        next(error);
    }
};

export const getUserProducts = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const products = await getProductsByUserId(userId);

        res.json({
            success: true, message: FRIENDLY_MESSAGES[200], count: products.length, data: products,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            const error = new Error("Forbidden");
            error.status = 403;
            throw error;
        }

        const {id} = req.params;
        const deleted = await deleteProductById(id);

        if (!deleted) {
            const error = new Error("Product not found");
            error.status = 404;
            throw error;
        }

        res.json({
            success: true, message: FRIENDLY_MESSAGES[200]
        });
    } catch (error) {
        next(error);
    }
};

export const editProduct = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            const error = new Error("Forbidden");
            error.status = 403;
            throw error;
        }

        const {id} = req.params;
        const productData = {
            title: req.body.title?.trim(),
            description: req.body.description?.trim(),
            price: req.body.price !== undefined ? Number(req.body.price) : null,
        };

        if (req.file) productData.image = req.file.filename;

        if ("variants" in req.body) {
            const {variants} = req.body;
            productData.variants = typeof variants === "string" ? JSON.parse(variants) : (variants || []);
        }

        const updated = await updateProduct(id, productData);

        res.json({
            success: true, message: FRIENDLY_MESSAGES[200], data: updated
        });
    } catch (error) {
        next(error);
    }
};