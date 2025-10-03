import {
    addToWishlist as addToWishlistService, isInWishlist as isInWishlistService,
} from "../services/wishlistService.js";

export const addToWishlist = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const {productId} = req.body;
        const result = await addToWishlistService({
            user_id: req.user.id, product_id: productId,
        });

        return res.status(result.created ? 201 : 200).json({
            message: result.created ? "Added to wishlist" : "Already in wishlist",
            created: result.created,
            itemId: result.itemId,
        });
    } catch (error) {
        const msg = error?.message || "Server error";
        if (msg === "Unauthorized") {
            return res.status(401).json({message: "Unauthorized"});
        }
        if (msg === "Product not found") {
            return res.status(404).json({message: "Product not found"});
        }
        return res.status(500).json({message: msg, detail: error?.detail});
    }
};

export const checkWishlistStatus = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const productId = req.query.productId;
        const inWishlist = await isInWishlistService({
            user_id: req.user.id, product_id: productId,
        });

        return res.json({inWishlist});
    } catch (error) {
        const msg = error?.message || "Server error";
        if (msg === "Unauthorized") {
            return res.status(401).json({message: "Unauthorized"});
        }
        if (msg.includes("required")) {
            return res.status(400).json({message: msg});
        }
        return res.status(500).json({message: msg, detail: error?.detail});
    }
};