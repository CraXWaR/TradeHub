import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    }, first_name: {
        type: DataTypes.STRING, allowNull: false
    }, last_name: {
        type: DataTypes.STRING, allowNull: false
    }, email: {
        type: DataTypes.STRING, allowNull: false
    }, phone_number: {
        type: DataTypes.STRING, allowNull: false
    }, address: {
        type: DataTypes.TEXT, allowNull: false
    }, city: {
        type: DataTypes.STRING, allowNull: false
    }, postal_code: {
        type: DataTypes.STRING, allowNull: false
    }, country: {
        type: DataTypes.STRING, allowNull: false
    }, subtotal: {
        type: DataTypes.DECIMAL(10, 2), allowNull: false
    }, shipping: {
        type: DataTypes.DECIMAL(10, 2), allowNull: false
    }, tax: {
        type: DataTypes.DECIMAL(10, 2), allowNull: false
    }, total: {
        type: DataTypes.DECIMAL(10, 2), allowNull: false
    }, apply_gift_wrap: {
        type: DataTypes.BOOLEAN, defaultValue: false
    }, status: {
        type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'), defaultValue: 'pending'
    }, user_id: {
        type: DataTypes.INTEGER, allowNull: true
    }
}, {
    tableName: "orders", underscored: true, timestamps: true,
});

export default Order;