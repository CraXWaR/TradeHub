import Product from "../models/Product.js";
import User from "../models/User.js";
import path from "path";

export const createProduct = async ({ user_id, title, description, price, image }) => {
    try {
        const product = await Product.create({
            user_id,
            title: title?.trim(),
            description: description?.trim() ?? null,
            price: Number(price),
            image: image ?? null,
        });

        const created = await Product.findByPk(product.id, {
            include: { model: User, attributes: ["id", "name", "email", "role"] },
        });

        return created.get({ plain: true });
    } catch (error) {
        throw {
            message: "Failed to create product",
            detail: error.message,
        };
    }
};

export const getAllProducts = async () => {
    try {
        const products = await Product.findAll({
            order: [["created_at", "DESC"]],
            include: { model: User, attributes: ["id", "name", "email", "role"] },
        });

        return products.map(p => p.get({ plain: true }));
    } catch (error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
    }
};

export const getProductById = async (id) => {
    try {
        const product = await Product.findByPk(id, {
            include: { model: User, attributes: ["id", "name", "email", "role"] },
        });

        return product ? product.get({ plain: true }) : null;
    } catch (error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
    }
};

export const getProductsByUserId = async (userId) => {
    try {
        const products = await Product.findAll({
            where: { user_id: userId },
            order: [["created_at", "DESC"]],
            include: { model: User, attributes: ["id", "name", "email", "role"] },
        });

        return products.map(p => p.get({ plain: true }));
    } catch (error) {
        throw new Error(`Failed to fetch user products: ${error.message}`);
    }
};

export const deleteProductById = async (id) => {
    try {
        const deletedCount = await Product.destroy({ where: { id } });
        return deletedCount > 0;
    } catch (error) {
        throw new Error(`Failed to delete product: ${error.message}`);
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const patch = {};
        if (productData.title !== undefined) patch.title = productData.title;
        if (productData.description !== undefined) patch.description = productData.description;
        if (productData.price !== undefined) patch.price = Number(productData.price);
        if (productData.image) patch.image = productData.image;

        await Product.update(patch, { where: { id } });

        const updated = await Product.findByPk(id, {
            include: { model: User, attributes: ["id", "name", "email", "role"] },
        });

        if (!updated) throw new Error("Product not found");

        const plain = updated.get({ plain: true });

        // normalize image path
        if (plain.image) {
            const baseUrl = (process.env.BASE_URL || "http://localhost:5000").replace(/\/+$/, "");
            const nameOnly = path.basename(String(plain.image));
            plain.image = `${baseUrl}/uploads/${nameOnly}`;
        }

        return plain;
    } catch (error) {
        throw {
            message: "Failed to update product",
            detail: error.message,
        };
    }
};
