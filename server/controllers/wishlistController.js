import WishlistItem from '../models/WishlistItem.js';
import Product from '../models/Product.js';

/**
 * POST /api/wishlist
 * body: { productId: number }
 * auth: requires req.user.id to be set by your auth middleware
 */

export async function addToWishlist(req, res) {
    const userId = req.user?.id;
    const { productId } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!productId || Number.isNaN(Number(productId))) {
        return res.status(400).json({ message: 'productId is required' });
    }

    try {
        const product = await Product.findByPk(productId, { attributes: ['id'] });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const [item, created] = await WishlistItem.findOrCreate({
            where: { user_id: userId, product_id: productId },
            defaults: { user_id: userId, product_id: productId },
        });

        return res.status(created ? 201 : 200).json({
            message: created ? 'Added to wishlist' : 'Already in wishlist',
            created,
            itemId: item.id,
        });
    } catch (err) {
        if (err?.name === 'SequelizeUniqueConstraintError') {
            return res.status(200).json({ message: 'Already in wishlist', created: false });
        }
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}
