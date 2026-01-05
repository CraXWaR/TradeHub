'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false
            }, name: {
                type: Sequelize.STRING, allowNull: false
            }, email: {
                type: Sequelize.STRING, allowNull: false, unique: true
            }, password: {
                type: Sequelize.STRING, allowNull: false
            }, role: {
                type: Sequelize.STRING, defaultValue: 'user'
            }, created_at: {
                allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')
            }, updated_at: {
                allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('users');
    }
};