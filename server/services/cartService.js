import {Product, ProductVariants, User} from "../models/index.js";
import CartItem from "../models/CartItem.js";

export const getCartItemsByIds = async (ids) => {
    const uniqueIds = [...new Set(ids)];

    if (!uniqueIds.length) {
        return [];
    }

    const products = await Product.findAll({
        where: {id: uniqueIds},
        order: [["created_at", "DESC"]],
        include: [{model: User, attributes: ["id", "name", "email", "role"],}, {
            model: ProductVariants, as: "variants",
        },]
    });

    return products;
};

export const getUserCartFromDb = async (userId) => {
    return await CartItem.findAll({
        where: {user_id: userId}, include: [{
            model: Product,
            as: "product",
            include: [{model: User, attributes: ["id", "name"]}, {model: ProductVariants, as: "variants"}],
            order: [["created_at", "ASC"]],
        }],
    })
}

export const addItemToDb = async (usedId, {productId, variantId, quantity}) => {
    const [item, created] = await CartItem.findOrCreate({
        where: {
            user_id: usedId, product_id: productId, variant_id: variantId || null
        }, defaults: {quantity}
    });

    if (!created) {
        item.quantity += quantity;
        await item.save();
    }

    return item;
}

export const removeItemFromDb = async (userId, productId, variantId) => {
    return await CartItem.destroy({
        where: {
            user_id: userId, product_id: productId, variant_id: variantId || null
        }
    });
};

export const clearUserCartInDb = async (userId) => {
    return await CartItem.destroy({
        where: {user_id: userId}
    });
};

export const updateItemQuantityInDb = async (userId, productId, variantId, quantity) => {
    const item = await CartItem.findOne({
        where: {
            user_id: userId, product_id: productId, variant_id: variantId || null
        }
    });

    if (item) {
        item.quantity = quantity;
        await item.save();
    }
    return item;
};

export const updateItemVariantInDb = async (userId, productId, oldVariantId, newVariantId) => {
    const oldItem = await CartItem.findOne({
        where: {user_id: userId, product_id: productId, variant_id: oldVariantId || null}
    });

    if (!oldItem) return null;

    const existingNewVariant = await CartItem.findOne({
        where: {user_id: userId, product_id: productId, variant_id: newVariantId || null}
    });

    if (existingNewVariant) {
        existingNewVariant.quantity += oldItem.quantity;
        await existingNewVariant.save();
        await oldItem.destroy();
        return existingNewVariant;
    } else {
        oldItem.variant_id = newVariantId || null;
        await oldItem.save();
        return oldItem;
    }
};