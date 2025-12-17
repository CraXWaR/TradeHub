import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const CartItem = sequelize.define("CartItem", {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    }, user_id: {
        type: DataTypes.INTEGER, allowNull: false
    }, product_id: {
        type: DataTypes.INTEGER, allowNull: false
    }, variant_id: {
        type: DataTypes.INTEGER, allowNull: true
    }, quantity: {
        type: DataTypes.INTEGER, allowNull: false, defaultValue: 1
    }
}, {
    tableName: "cart_items", underscored: true, timestamps: true
});

export default CartItem;