import db from "../config/db.js";
import path from "path";

export const createProduct = async (productData) => {
    const {user_id, title, description, price, image} = productData;

    try {
        const [result] = await db.query(
            `INSERT INTO products (user_id, title, description, price, image, created_at)
             VALUES (?, ?, ?, ?, ?, NOW())`,
            [user_id, title, description, price, image]
        );

        const [rows] = await db.query(
            `SELECT id, user_id, title, description, price, image, created_at
             FROM products
             WHERE id = ?`,
            [result.insertId]
        );

        const product = rows[0];
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";

        return {
            id: product.id,
            userId: product.user_id,
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image ? `${baseUrl}${product.image}` : null,
            createdAt: product.created_at
        };
    } catch (error) {
        throw {
            message: "Failed to create product",
            code: error.code,
            detail: error.message
        };
    }
};

export const getAllProducts = async () => {
    try {
        const [rows] = await db.query(
            "SELECT id, user_id, title, description, price, image, created_at FROM products ORDER BY created_at DESC"
        );
        return rows;
    } catch (error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
    }
};

export const getProductById = async (id) => {
    try {
        const [rows] = await db.query(
            "SELECT id, user_id, title, description, price, image, created_at FROM products WHERE id = ?",
            [id]
        );
        return rows[0] || null;
    } catch (error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
    }
};

export const getProductsByUserId = async (userId) => {
    try {
        const [rows] = await db.query(
            "SELECT id, user_id, title, description, price, image, created_at FROM products WHERE user_id = ? ORDER BY created_at DESC",
            [userId]
        );
        return rows;
    } catch (error) {
        throw new Error(`Failed to fetch user products: ${error.message}`);
    }
};

export const deleteProductById = async (id) => {
    try {
        const [result] = await db.query(
            "DELETE FROM products WHERE id = ?",
            [id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Failed to delete product: ${error.message}`);
    }
};

export const updateProduct = async (id, productData) => {
    const {title, description, price, image} = productData;

    try {
        let query = 'UPDATE products SET title = ?, description = ?, price = ?';
        const params = [title, description, price];

        if (image) {
            query += ', image = ?';
            params.push(image);
        }

        query += ' WHERE id = ?';
        params.push(id);

        await db.query(query, params);

        const [rows] = await db.query(
            `SELECT id, user_id, title, description, price, image, created_at
             FROM products
             WHERE id = ?`,
            [id]
        );

        if (!rows || rows.length === 0) {
            throw new Error('Product not found');
        }

        const product = rows[0];
        const baseUrlRaw = process.env.BASE_URL || 'http://localhost:5000';
        const baseUrl = baseUrlRaw.replace(/\/+$/, '');

        let imagePath = product.image || null;
        if (imagePath) {
            const nameOnly = path.basename(String(imagePath));
            if (!String(imagePath).includes('/uploads/')) {
                imagePath = `/uploads/${nameOnly}`;
            }
        }

        return {
            id: product.id,
            userId: product.user_id,
            title: product.title,
            description: product.description,
            price: product.price,
            image: imagePath ? `${baseUrl}${imagePath}` : null,
            createdAt: product.created_at,
        };
    } catch (error) {
        throw {
            message: 'Failed to update product',
            code: error.code,
            detail: error.message,
        };
    }
};