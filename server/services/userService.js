import bcrypt from "bcrypt";
import {User} from "../models/index.js";

const SALT_ROUNDS = 10;

class UserService {
    async createUser({name, email, password, role}) {
        const existingUser = await this.getUserByEmail(email);
        if (existingUser) {
            const err = new Error("User with this email already exists");
            err.statusCode = 409;
            throw err;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await User.create({
            name, email, password: hashedPassword, role: role || "user",
        });

        const {password: _, ...userWithoutPassword} = user.get({plain: true});
        return userWithoutPassword;
    }

    async authenticateUser(email, password) {
        const user = await User.findOne({where: {email}});
        if (!user) {
            const err = new Error("Invalid email or password");
            err.statusCode = 401;
            throw err;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const err = new Error("Invalid email or password");
            err.statusCode = 401;
            throw err;
        }

        const {password: _, ...userWithoutPassword} = user.get({plain: true});
        return userWithoutPassword;
    }

    async getUserById(id) {
        const user = await User.findByPk(id);
        return user ? user.get({plain: true}) : null;
    }

    async getUserByEmail(email) {
        const user = await User.findOne({where: {email}});
        return user ? user.get({plain: true}) : null;
    }

    async getAllUsers() {
        const users = await User.findAll({
            order: [["created_at", "DESC"]], attributes: ["id", "name", "email", "role", "created_at"],
        });
        return users.map((u) => u.get({plain: true}));
    }
}

export default new UserService();
