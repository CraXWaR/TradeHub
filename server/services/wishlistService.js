import {WishlistItem, Product} from "../models/index.js";

export const addToWishlist = async ({ user_id, product_id }) => {
    try {
        if (!user_id) throw { status: 401, message: "Unauthorized" };

        const id = Number(product_id);
        if (!id || Number.isNaN(id)) throw { status: 400, message: "Invalid productId" };

        const product = await Product.findByPk(id, { attributes: ["id"] });
        if (!product) throw { status: 404, message: "Product not found" };

        const [item, created] = await WishlistItem.findOrCreate({
            where: { user_id, product_id: id },
            defaults: { user_id, product_id: id },
        });

        return { created, itemId: item.id };
    } catch (error) {
        if (error?.name === "SequelizeUniqueConstraintError") return { created: false };
        if (error?.status) throw error;
        throw { status: 500, message: "Internal error", detail: error?.message };
    }
};

export const isInWishlist = async ({ user_id, product_id }) => {
    try {
        if (!user_id) throw { status: 401, message: "Unauthorized" };
        const id = Number(product_id);
        if (!id || Number.isNaN(id)) throw { status: 400, message: "Invalid productId" };

        const item = await WishlistItem.findOne({
            where: { user_id, product_id: id },
            attributes: ["id"],
        });

        return !!item;
    } catch (error) {
        if (error?.status) throw error;
        throw { status: 500, message: "Internal error", detail: error?.message };
    }
};