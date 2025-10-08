import {Router} from 'express';
import {addToWishlist, checkWishlistStatus, removeFromWishlist} from "../controllers/wishlistController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = Router();

router.post('/', authMiddleware, addToWishlist);
router.get('/', authMiddleware, checkWishlistStatus);
router.delete("/remove", authMiddleware, removeFromWishlist);

export default router;
