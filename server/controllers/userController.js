import jwt from "jsonwebtoken";
import userService from "../services/userService.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
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
        const user = await userService.authenticateUser(
            req.body.email,
            req.body.password
        );

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            success: true,
            data: {
                ...user,
                token,
            },
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to login user",
        });
    }
};