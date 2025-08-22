import db from "../config/db.js";
import userService from "../services/userService.js";

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

export const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error registering user:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to register user",
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await userService.authenticateUser(req.body.email, req.body.password);

        res.json({
            success: true,
            message: "Login successful",
            data: user,
        });
    } catch (error) {
        console.error("Error logging in user:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to login user",
        });
    }
};
