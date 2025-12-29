import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { sequelize, User, Product } from './models/index.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import wishListRoutes from './routes/wishlistRoutes.js';
import cartRoutes from "./routes/cartRoutes.js";

//Middlewares
import {notFound} from "./middleware/notFoundMiddleware.js";
import {errorHandler} from "./middleware/errorHandlerMiddleware.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: false,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    })
);
app.use(express.json());

// Static files for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/user/wishlist', wishListRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

// Health check
app.get('/api/test', (_req, res) => {
    res.json({ message: 'API is running 🚀' });
});

// Test Sequelize + associations
app.get('/api/test-sequelize', async (_req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Product, attributes: ['id', 'title', 'price'] }],
        });
        res.json(users);
    } catch (err) {
        console.error('❌ Sequelize test failed:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// DB connection
try {
    await sequelize.authenticate();
    console.log('✅ Sequelize connected to MySQL');

    // In dev only (NEVER in prod with migrations):
    await sequelize.sync({ alter: false });
} catch (err) {
    console.error('❌ Sequelize connection failed:', err.message);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
