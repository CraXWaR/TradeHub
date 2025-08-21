import db from '../config/db.js';
import User from '../models/User.js';

class UserService {
    async createUser(userData) {
        const { name, email, password } = userData;
        
        try {
            const existingUser = await this.getUserByEmail(email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            const query = `
                INSERT INTO users (name, email, password, created_at) 
                VALUES (?, ?, ?, NOW())
            `;
            
            const [result] = await db.execute(query, [name, email, password]);
            
            const newUser = await this.getUserById(result.insertId);
            return newUser;
            
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const [rows] = await db.execute(query, [id]);
            
            if (rows.length === 0) {
                return null;
            }
            
            const user = rows[0];
            return new User(user.id, user.name, user.email, user.password, user.created_at);
            
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await db.execute(query, [email]);
            
            if (rows.length === 0) {
                return null;
            }
            
            const user = rows[0];
            return new User(user.id, user.name, user.email, user.password, user.created_at);
            
        } catch (error) {
            throw error;
        }
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
