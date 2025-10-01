'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('wishlist_items', {
            id: {
                type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'users', key: 'id'},
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'products', key: 'id'},
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            created_at: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW')},
            updated_at: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW')},
        });

        await queryInterface.addConstraint('wishlist_items', {
            fields: ['user_id', 'product_id'], type: 'unique', name: 'wishlist_items_user_product_unique',
        });

        await queryInterface.addIndex('wishlist_items', ['user_id'], {
            name: 'wishlist_items_user_idx',
        });
        await queryInterface.addIndex('wishlist_items', ['product_id'], {
            name: 'wishlist_items_product_idx',
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('wishlist_items');
    },
};
