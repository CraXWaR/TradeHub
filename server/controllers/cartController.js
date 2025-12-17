import {
    getCartItemsByIds,
    getUserCartFromDb,
    addItemToDb,
    removeItemFromDb,
    clearUserCartInDb,
    updateItemQuantityInDb,
    updateItemVariantInDb
} from "../services/cartService.js";

export const getCartItems = async (req, res, next) => {
    try {
        if (req.user && req.user.id) {
            const items = await getUserCartFromDb(req.user.id);
            return res.json(items);
        }

        const {ids} = req.query;

        if (!ids) {
            return res.status(400).json({
                error: "Missing query parameter 'ids'.",
            });
        }

        const parsedIds = ids
            .split(",")
            .map((v) => parseInt(v, 10))
            .filter((v) => !Number.isNaN(v));

        if (!parsedIds.length) {
            return res.status(400).json({
                error: "No valid numeric ids provided.",
            });
        }

        const items = await getCartItemsByIds(parsedIds);

        return res.json(items);
    } catch (err) {
        next(err);
    }
};

export const addToCart = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({error: "Unauthorized"});
        }

        const {productId, variantId, quantity} = req.body;

        await addItemToDb(req.user.id, {
            productId, variantId: variantId || null, quantity: quantity || 1
        });

        const updatedCart = await getUserCartFromDb(req.user.id);
        return res.json({data: updatedCart});
    } catch (err) {
        next(err);
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        if (!req.user) return res.status(401).json({error: "Unauthorized"});

        const {productId, variantId} = req.body;

        await removeItemFromDb(req.user.id, productId, variantId);

        const updatedCart = await getUserCartFromDb(req.user.id);
        return res.json({data: updatedCart});
    } catch (err) {
        next(err);
    }
};

export const clearUserCart = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({error: "Unauthorized"});
        }

        await clearUserCartInDb(req.user.id);

        return res.json({
            message: "Cart cleared successfully", data: []
        });
    } catch (err) {
        next(err);
    }
};

export const updateQuantity = async (req, res, next) => {
    try {
        const {productId, variantId, quantity} = req.body;
        await updateItemQuantityInDb(req.user.id, productId, variantId, quantity);

        const updatedCart = await getUserCartFromDb(req.user.id);
        return res.json(updatedCart);
    } catch (err) {
        next(err);
    }
};

export const updateVariant = async (req, res, next) => {
    try {
        const {productId, oldVariantId, newVariantId} = req.body;
        await updateItemVariantInDb(req.user.id, productId, oldVariantId, newVariantId);

        const updatedCart = await getUserCartFromDb(req.user.id);
        return res.json(updatedCart);
    } catch (err) {
        next(err);
    }
};