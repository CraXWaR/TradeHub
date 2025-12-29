import bcrypt from "bcrypt";
import {User} from "../models/index.js";

const SALT_ROUNDS = 10;

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({where: {email}});
        return user ? user.get({plain: true}) : null;
    } catch (error) {
        throw new Error(`Failed to fetch user by email: ${error.message}`);
    }
};

export const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user ? user.get({plain: true}) : null;
    } catch (error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};

export const createUser = async ({name, email, password, role}) => {
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            const err = new Error("Email already registered");
            err.status = 409;
            throw err;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await User.create({
            name, email, password: hashedPassword, role: role || "user",
        });

        const {password: _, ...userWithoutPassword} = user.get({plain: true});
        return userWithoutPassword;
    } catch (error) {
        throw {
            status: error.status || 500, message: error.message, detail: error.message
        };
    }
};

export const authenticateUser = async (email, password) => {
    try {
        const user = await User.findOne({where: {email}});
        if (!user) {
            const err = new Error("Unauthorized");
            err.status = 401;
            throw err;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const err = new Error("Unauthorized");
            err.status = 401;
            throw err;
        }

        const {password: _, ...userWithoutPassword} = user.get({plain: true});
        return userWithoutPassword;
    } catch (error) {
        throw {
            status: error.status || 401, message: error.message, detail: error.message
        };
    }
};

export const getAllUsers = async () => {
    try {
        const users = await User.findAll({
            order: [["created_at", "DESC"]], attributes: ["id", "name", "email", "role", "created_at"],
        });
        return users.map((u) => u.get({plain: true}));
    } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
};

export const updateUserName = async (id, name) => {
    try {
        if (!name) {
            const err = new Error("invalid: Name is required");
            err.status = 400;
            throw err;
        }
        if (name.length > 100) {
            const err = new Error("invalid: Name is too long");
            err.status = 422;
            throw err;
        }

        const user = await User.findByPk(id);
        if (!user) {
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        user.name = name;
        await user.save();

        const {password, ...safeUser} = user.get({plain: true});
        return safeUser;
    } catch (error) {
        throw {
            status: error.status || 500, message: error.message, detail: error.message
        };
    }
};