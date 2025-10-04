import {
    addToWishlist as addToWishlistService, isInWishlist as isInWishlistService,
} from "../services/wishlistService.js";

export const addToWishlist = async (req, res, next) => {
    try {
        if (!req.user) throw { status: 401, message: "Unauthorized" };

        const { productId } = req.body;
        const result = await addToWishlistService({
            user_id: req.user.id,
            product_id: productId,
        });

        const status = result.created ? 201 : 200;
        return res.status(status).json({
            message: result.created
                ? "This product has been successfully added to your wishlist! You can view all your saved items anytime from your wishlist page."
                : "This product is already in your wishlist — you can find it there whenever you’re ready to check it out!",
            created: result.created,
            itemId: result.itemId,
        });
    } catch (err) {
        next(err);
    }
};

export const checkWishlistStatus = async (req, res, next) => {
    try {
        if (!req.user) throw { status: 401, message: "Unauthorized" };

        const inWishlist = await isInWishlistService({
            user_id: req.user.id,
            product_id: req.query.productId,
        });

        res.status(200).json({ inWishlist });
    } catch (err) {
        next(err);
    }
};