import {WishlistItem, Product} from "../models/index.js";

export const addToWishlist = async ({user_id, product_id}) => {
    try {
        if (!user_id) throw new Error("Unauthorized");
        if (!product_id || Number.isNaN(Number(product_id))) {
            throw new Error("productId is required");
        }

        const product = await Product.findByPk(product_id, {attributes: ["id"]});
        if (!product) {
            throw {message: "Product not found"};
        }

        const [item, created] = await WishlistItem.findOrCreate({
            where: {user_id, product_id}, defaults: {user_id, product_id},
        });

        return {created, itemId: item.id};
    } catch (error) {
        if (error?.name === "SequelizeUniqueConstraintError") {
            return {created: false};
        }
        throw {
            message: "Failed to add to wishlist", detail: error.message || error?.message,
        };
    }
};

export const isInWishlist = async ({user_id, product_id}) => {
    try {
        if (!user_id) throw new Error("Unauthorized");
        const id = Number(product_id);
        if (!id || Number.isNaN(id)) throw new Error("productId is required");

        const item = await WishlistItem.findOne({
            where: {user_id, product_id: id}, attributes: ["id"],
        });

        return !!item;
    } catch (error) {
        throw {
            message: "Failed to check wishlist status", detail: error.message,
        };
    }
};