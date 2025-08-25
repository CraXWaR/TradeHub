import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

db.query("SELECT 1")
    .then(() => console.log("✅ MySQL connected"))
    .catch((err) => console.error("❌ DB connection failed:", err));

app.get("/api/test", (req, res) => {
    res.json({message: "API is running 🚀"});
});

// Static files for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));