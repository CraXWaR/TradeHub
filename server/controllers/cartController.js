import {getCartItemsByIds} from "../services/cartService.js";

export const getCartItems = async (req, res, next) => {
    try {
        const {ids} = req.query;

        if (!ids) {
            return res.status(400).json({
                error: "Missing query parameter 'ids'. Example: /api/cart?ids=1,2,3",
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