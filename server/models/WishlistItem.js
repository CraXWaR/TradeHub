import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

const WishlistItem = sequelize.define('WishlistItem', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}, user_id: {
        type: DataTypes.INTEGER, allowNull: false, references: {model: 'users', key: 'id'}, onDelete: 'CASCADE',
    }, product_id: {
        type: DataTypes.INTEGER, allowNull: false, references: {model: 'products', key: 'id'}, onDelete: 'CASCADE',
    },
}, {
    tableName: 'wishlist_items',
    underscored: true,
    timestamps: true,
    indexes: [{
        unique: true,
        fields: ['user_id', 'product_id'],
        name: 'wishlist_items_user_product_unique'
    }, {fields: ['user_id'], name: 'wishlist_items_user_idx'}, {
        fields: ['product_id'],
        name: 'wishlist_items_product_idx'
    },],
});

export default WishlistItem;
