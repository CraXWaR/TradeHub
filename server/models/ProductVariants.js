import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const ProductVariants = sequelize.define("ProductVariant", {
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true,
    }, product_id: {
        type: DataTypes.INTEGER, allowNull: false, references: {model: "products", key: "id"}, onDelete: "CASCADE",
    }, name: {
        type: DataTypes.STRING, allowNull: false,
    }, price: {
        type: DataTypes.FLOAT, allowNull: true,
    }, // Can add more fields later:
    // sku: DataTypes.STRING,
    // stock: DataTypes.INTEGER,
}, {
    tableName: "product_variants", underscored: true, timestamps: true,
});

export default ProductVariants;
