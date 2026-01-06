import {authenticateUser, createUser, getAllUsers, getUserById, updateUserName} from "../services/userService.js";
import {FRIENDLY_MESSAGES} from "../utils/messages.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();

        res.json({
            success: true, message: FRIENDLY_MESSAGES[200], count: users.length, data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const register = async (req, res, next) => {
    try {
        const user = await createUser(req.body);

        res.status(201).json({
            success: true, message: FRIENDLY_MESSAGES[201], data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await authenticateUser(email, password);

        const payload = {
            id: user.id, role: user.role, email: user.email, name: user.name,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.json({
            success: true, message: FRIENDLY_MESSAGES[200], data: {
                ...user, token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.id);

        if (!user) {
            const error = new Error("Product not found");
            return next(error);
        }

        res.json({
            success: true, data: user
        });
    } catch (error) {
        next(error);
    }
};

export const updateMe = async (req, res, next) => {
    try {
        const {name} = req.body;
        const updated = await updateUserName(req.user.id, name);

        res.json({
            success: true, message: FRIENDLY_MESSAGES[200], data: updated
        });
    } catch (error) {
        next(error);
    }
};
