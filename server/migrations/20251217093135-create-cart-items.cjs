'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('cart_items', {
            id: {
                type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false
            }, user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'users', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }, product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'products', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }, variant_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {model: 'product_variants', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }, quantity: {
                type: Sequelize.INTEGER, allowNull: false, defaultValue: 1
            }, created_at: {
                allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')
            }, updated_at: {
                allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('cart_items');
    }
};
