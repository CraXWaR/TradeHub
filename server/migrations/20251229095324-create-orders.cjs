'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER
            }, first_name: {
                type: Sequelize.STRING, allowNull: false
            }, last_name: {
                type: Sequelize.STRING, allowNull: false
            }, email: {
                type: Sequelize.STRING, allowNull: false
            }, phone_number: {
                type: Sequelize.STRING, allowNull: false
            }, address: {
                type: Sequelize.TEXT, allowNull: false
            }, city: {
                type: Sequelize.STRING, allowNull: false
            }, postal_code: {
                type: Sequelize.STRING, allowNull: false
            }, country: {
                type: Sequelize.STRING, allowNull: false
            }, subtotal: {
                type: Sequelize.DECIMAL(10, 2), allowNull: false
            }, shipping: {
                type: Sequelize.DECIMAL(10, 2), allowNull: false
            }, tax: {
                type: Sequelize.DECIMAL(10, 2), allowNull: false
            }, total: {
                type: Sequelize.DECIMAL(10, 2), allowNull: false
            }, apply_gift_wrap: {
                type: Sequelize.BOOLEAN, defaultValue: false
            }, status: {
                type: Sequelize.ENUM('pending', 'paid', 'shipped', 'cancelled'), defaultValue: 'pending'
            }, user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {model: 'Users', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }, created_at: {allowNull: false, type: Sequelize.DATE}, updated_at: {allowNull: false, type: Sequelize.DATE}
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Orders');
    }
};
