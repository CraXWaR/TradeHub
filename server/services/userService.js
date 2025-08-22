import db from '../config/db.js';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const SALT_ROUNDS = 10;

class UserService {
    async createUser({ name, email, password }) {
        const existingUser = await this.getUserByEmail(email);
        if (existingUser) {
            const err = new Error("User with this email already exists");
            err.statusCode = 409;
            throw err;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const query = `
      INSERT INTO users (name, email, password, created_at) 
      VALUES (?, ?, ?, NOW())
    `;
        const [result] = await db.execute(query, [name, email, hashedPassword]);

        const newUser = await this.getUserById(result.insertId);

        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async authenticateUser(email, password) {
        const user = await this.getUserByEmail(email);
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

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getUserById(id) {
        const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0] || null;
    }

    async getUserByEmail(email) {
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0] || null;
    }

    async getAllUsers() {
        try {
            const query = 'SELECT * FROM users ORDER BY created_at DESC';
            const [rows] = await db.execute(query);
            
            return rows.map(user => 
                new User(user.id, user.name, user.email, user.password, user.created_at)
            );
            
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();
