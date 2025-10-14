import {Router} from 'express';
import {
    addToWishlist,
    checkWishlistStatus,
    getWishlistItems,
    removeFromWishlist
} from "../controllers/wishlistController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = Router();

router.post('/', authMiddleware, addToWishlist);
router.get('/status', authMiddleware, checkWishlistStatus);
router.delete("/remove", authMiddleware, removeFromWishlist);
router.get('/', authMiddleware, getWishlistItems);

export default router;
