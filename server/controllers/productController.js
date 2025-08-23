import { createProduct, getAllProducts, getProductById, getProductsByUserId } from "../services/productService.js";

export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
};

export const createNewProduct = async (req, res) => {
    try {
        const { title, description, price, image } = req.body;
        const user_id = req.user.id;

        if (!title || !description || !price) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: title, description, price"
            });
        }

        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid number greater than 0"
            });
        }

        const productData = {
            user_id,
            title: title.trim(),
            description: description.trim(),
            price: numericPrice,
            image: image || null
        };

        const newProduct = await createProduct(productData);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message
        });
    }
};


export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: error.message
        });
    }
};

export const getUserProducts = async (req, res) => {
    try {
        const { userId } = req.params;
        const products = await getProductsByUserId(userId);

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error("Error fetching user products:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user products",
            error: error.message
        });
    }
};
