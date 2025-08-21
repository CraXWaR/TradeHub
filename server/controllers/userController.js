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
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        if (name.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Name must be at least 3 characters long"
            });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }

        if (password.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 3 characters long"
            });
        }

        const newUser = await userService.createUser({ name, email, password });
        
        const { password: _, ...userWithoutPassword } = newUser;
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userWithoutPassword
        });
        
    } catch (error) {
        console.error("Error registering user:", error);
        
        if (error.message === 'User with this email already exists') {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }
        
        res.status(500).json({
            success: false,
            message: "Failed to register user",
            error: error.message
        });
    }
};
