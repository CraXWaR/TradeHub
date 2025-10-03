import { Router } from 'express';
import {addToWishlist, checkWishlistStatus} from "../controllers/wishlistController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = Router();

router.post('/', authMiddleware, addToWishlist);
router.get('/', authMiddleware, checkWishlistStatus);

export default router;
