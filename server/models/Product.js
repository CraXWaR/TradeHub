import {DataTypes} from 'sequelize';
import sequelize from "../config/db.js";

const Product = sequelize.define('Product', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    user_id: {
        type: DataTypes.INTEGER, allowNull: false, references: {model: 'users', key: 'id'}, onDelete: 'CASCADE',
    },
    title: {type: DataTypes.STRING, allowNull: false},
    description: DataTypes.TEXT,
    price: {type: DataTypes.FLOAT, allowNull: false},
    image: DataTypes.STRING,
}, {
    tableName: 'products', underscored: true, timestamps: true,
});

export default Product;
