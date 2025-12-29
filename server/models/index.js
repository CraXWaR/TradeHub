import sequelize from '../config/db.js';

import User from './User.js';
import Product from './Product.js';
import WishlistItem from './WishlistItem.js';
import ProductVariants from "./ProductVariants.js";
import CartItem from "./CartItem.js";
import Order from './Order.js';
import OrderItem from "./OrderItem.js";

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
// Wishlist: User ↔ Product
// --------------------
User.belongsToMany(Product, {
    through: WishlistItem, foreignKey: 'user_id', otherKey: 'product_id', as: 'wishlist',
});
Product.belongsToMany(User, {
    through: WishlistItem, foreignKey: 'product_id', otherKey: 'user_id', as: 'wishlistedBy',
});
WishlistItem.belongsTo(Product, {
    foreignKey: 'product_id',
});

// --------------------
// Product → ProductVariant
// --------------------
Product.hasMany(ProductVariants, {
    foreignKey: 'product_id', as: 'variants',
});
ProductVariants.belongsTo(Product, {
    foreignKey: 'product_id', as: 'product',
});

// --------------------
// User → CartItem
// --------------------
User.hasMany(CartItem, {
    foreignKey: 'user_id', as: 'cartItems'
});
CartItem.belongsTo(User, {
    foreignKey: 'user_id'
});

// --------------------
// Product → CartItem
// --------------------
Product.hasMany(CartItem, {
    foreignKey: 'product_id'
});
CartItem.belongsTo(Product, {
    foreignKey: 'product_id', as: 'product'
});

// --------------------
// ProductVariant → CartItem
// --------------------
ProductVariants.hasMany(CartItem, {
    foreignKey: 'variant_id'
});
CartItem.belongsTo(ProductVariants, {
    foreignKey: 'variant_id', as: 'variant'
});

// --------------------
// User → Order
// --------------------
User.hasMany(Order, {
    foreignKey: 'user_id', as: 'orders'
});
Order.belongsTo(User, {
    foreignKey: 'user_id'
});

// --------------------
// Order → OrderItem
// --------------------
Order.hasMany(OrderItem, {
    foreignKey: 'order_id', as: 'items', onDelete: 'CASCADE'
});
OrderItem.belongsTo(Order, {
    foreignKey: 'order_id'
});

// --------------------
// Product → OrderItem
// --------------------
Product.hasMany(OrderItem, {
    foreignKey: 'product_id'
});
OrderItem.belongsTo(Product, {
    foreignKey: 'product_id', as: 'product'
});

// --------------------
// ProductVariant → OrderItem
// --------------------
ProductVariants.hasMany(OrderItem, {
    foreignKey: 'variant_id'
});
OrderItem.belongsTo(ProductVariants, {
    foreignKey: 'variant_id', as: 'variant'
});


export {sequelize, User, Product, WishlistItem, ProductVariants, Order, OrderItem};
