import { Router } from 'express';
import {addToWishlist} from "../controllers/wishlistController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = Router();

router.post('/', authMiddleware, addToWishlist);

export default router;
