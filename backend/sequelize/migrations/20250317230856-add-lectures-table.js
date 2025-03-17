'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('lectures', {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            order: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'Used to order lectures in a module',
            },
            module_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'modules',
                    key: 'id',
                },
            },
            resources: {
                type: Sequelize.JSONB,
                allowNull: false,
                defaultValue: {},
                comment:
                    'Store metadata and information about the resources linked to this lecture (e.g. videos, attachments)',
            },
            stats: {
                type: Sequelize.JSONB,
                allowNull: false,
                defaultValue: {},
                comment:
                    'Used to save usage metrics and useful statistics (e.g. to prevent deleting a lecture already purchased)',
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            deleted_at: {
                type: Sequelize.DATE,
            },
        });

        await queryInterface.addIndex('lectures', {
            fields: ['module_id'],
            name: 'lectures_module_id_index',
        });
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('lectures', { cascade: true });
    },
};
