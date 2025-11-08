import {Product, User} from "../models/index.js";

export const getCartItemsByIds = async (ids) => {
    const uniqueIds = [...new Set(ids)];

    if (!uniqueIds.length) {
        return [];
    }

    const products = await Product.findAll({
        where: {id: uniqueIds},
        order: [["created_at", "DESC"]],
        include: {
            model: User,
            attributes: ["id", "name", "email", "role"],
        },
    });

    return products;
};