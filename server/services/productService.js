import db from "../config/db.js";

export const createProduct = async (productData) => {
    const { user_id, title, description, price, image } = productData;

    try {
        const [result] = await db.query(
            `INSERT INTO products (user_id, title, description, price, image, created_at) 
             VALUES (?, ?, ?, ?, ?, NOW())`,
            [user_id, title, description, price, image]
        );

        const [rows] = await db.query(
            `SELECT id, user_id, title, description, price, image, created_at 
             FROM products WHERE id = ?`,
            [result.insertId]
        );

        return rows[0];
    } catch (error) {
        throw new Error(`Failed to create product: ${error.message}`);
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
