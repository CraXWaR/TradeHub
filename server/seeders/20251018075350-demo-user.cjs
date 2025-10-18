'use strict';

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash('123', 10);

        return queryInterface.bulkInsert('users', [{
            name: 'Demo User',
            email: 'demo@gmail.com',
            password: hashedPassword,
            role: 'user',
            created_at: new Date(),
            updated_at: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', {email: 'demo@gmail.com'}, {});
    }
};
