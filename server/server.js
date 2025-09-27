import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


// Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import Product from "./models/Product.js";
import User from "./models/User.js";
import sequelize from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static files for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/api/test-sequelize", async (req, res) => {
    try {
        const users = await User.findAll({
            include: { model: Product, attributes: ["id", "title", "price"] },
        });
        res.json(users);
    } catch (err) {
        console.error("❌ Sequelize test failed:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Health check route
app.get("/api/test", (req, res) => {
    res.json({ message: "API is running 🚀" });
});

// Test Sequelize DB connection
try {
    await sequelize.authenticate();
    console.log("✅ Sequelize connected to MySQL");
} catch (err) {
    console.error("❌ Sequelize connection failed:", err.message);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🌍 Server running on port ${PORT}`)
);
