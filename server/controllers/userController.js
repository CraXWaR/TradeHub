import db from "../config/db.js";

export const getUsers = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT id, name, email, created_at FROM users ORDER BY created_at DESC"
        );
        
        res.json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
};
