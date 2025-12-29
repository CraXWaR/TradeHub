'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('order_items', {
            id: {
                allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER
            },
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'Orders', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'products', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            variant_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {model: 'product_variants', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            quantity: {type: Sequelize.INTEGER, allowNull: false},
            price: {type: Sequelize.DECIMAL(10, 2), allowNull: false}
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('OrderItems');
    }
};
