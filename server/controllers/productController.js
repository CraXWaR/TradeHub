import db from "../config/db.js";

export const getProducts = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT id, user_id, title, description, price, image, created_at FROM products ORDER BY created_at DESC"
        );
        
        res.json({
            success: true,
            count: rows.length,
            data: rows
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
