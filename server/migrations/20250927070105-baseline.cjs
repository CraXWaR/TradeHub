'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(/* queryInterface, Sequelize */) {
        // Baseline migration — no schema changes.
        // This ensures SequelizeMeta table starts tracking migrations.
    },

    async down(/* queryInterface, Sequelize */) {
        // No rollback for baseline.
    }
};