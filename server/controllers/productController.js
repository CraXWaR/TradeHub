import {
    createProduct, deleteProductById, getAllProducts, getProductById, getProductsByUserId, updateProduct
} from "../services/productService.js";
import fs from "fs/promises";

export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json({
            success: true, count: products.length, data: products,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false, message: "Failed to fetch products", error: error.message,
        });
    }
};

export const createNewProduct = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({
                success: false, message: "You are not authorized to create products",
            });
        }

        const {title, description, price, image} = req.body;
        const user_id = req.user.id;

        let imageUrl = null;
        if (req.file) {
            imageUrl = req.file.filename;
        } else if (image) {
            imageUrl = image;
        } else {
            return res.status(400).json({
                success: false, message: "Image is required (upload a file)",
            });
        }

        const productData = {
            user_id, title: title?.trim(), description: description?.trim(), price: parseFloat(price), image: imageUrl,
        };

        const newProduct = await createProduct(productData);

        res.status(201).json({
            success: true, message: "Product created successfully", data: newProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            success: false, message: "Failed to create product", error: error.message,
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false, message: "Product not found",
            });
        }

        res.json({
            success: true, data: product,
        });
    } catch (error) {
        console.error("Error fetching product:", error);

        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {
            });
        }

        res.status(500).json({
            success: false, message: "Failed to fetch product", error: error.message,
        });
    }
};

export const getUserProducts = async (req, res) => {
    try {
        const {userId} = req.params;
        const products = await getProductsByUserId(userId);

        res.json({
            success: true, count: products.length, data: products,
        });
    } catch (error) {
        console.error("Error fetching user products:", error);
        res.status(500).json({
            success: false, message: "Failed to fetch user products", error: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({
                success: false, message: "You are not authorized to delete products",
            });
        }

        const {id} = req.params;

        const product = await getProductById(id);
        if (!product) {
            return res.status(404).json({
                success: false, message: "Product not found",
            });
        }

        const deleted = await deleteProductById(id);
        if (!deleted) {
            return res.status(404).json({
                success: false, message: "Product not found",
            });
        }

        res.json({
            success: true, message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            success: false, message: "Failed to delete product", error: error.message,
        });
    }
};

export const editProduct = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({
                success: false, message: "You are not authorized to edit products",
            });
        }

        const {id} = req.params;

        const productData = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price !== undefined ? Number(req.body.price) : null,
        };

        if (req.file) {
            productData.image = `${req.file.filename}`;
        }

        const updated = await updateProduct(id, productData);

        res.json({success: true, data: updated});
    } catch (err) {
        res.status(500).json({
            success: false, message: err?.message || "Error updating product",
        });
    }
};
