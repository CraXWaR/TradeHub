'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("product_variants", {
            id: {
                type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
            }, product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: "products", key: "id"},
                onDelete: "CASCADE",
            }, name: {
                type: Sequelize.STRING, allowNull: false,
            }, price: {
                type: Sequelize.FLOAT, allowNull: true,
            }, created_at: {
                allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW"),
            }, updated_at: {
                allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW"),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("product_variants");
    }
};
