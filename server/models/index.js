import sequelize from '../config/db.js';
import User from './User.js';
import Product from './Product.js';
import WishlistItem from './WishlistItem.js';
import ProductVariants from "./ProductVariants.js";

// --------------------
// User → Product
// --------------------
User.hasMany(Product, {
    foreignKey: 'user_id',
});
Product.belongsTo(User, {
    foreignKey: 'user_id',
});

// --------------------
// Wishlist: User ↔ Product (through WishlistItem)
// --------------------
User.belongsToMany(Product, {
    through: WishlistItem,
    foreignKey: 'user_id',
    otherKey: 'product_id',
    as: 'wishlist',
});

Product.belongsToMany(User, {
    through: WishlistItem,
    foreignKey: 'product_id',
    otherKey: 'user_id',
    as: 'wishlistedBy',
});

WishlistItem.belongsTo(Product, {
    foreignKey: 'product_id',
});

// --------------------
// Product → ProductVariant
// --------------------
Product.hasMany(ProductVariants, {
    foreignKey: 'product_id',
    as: 'variants',
});

ProductVariants.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product',
});

export {sequelize, User, Product, WishlistItem, ProductVariants};
