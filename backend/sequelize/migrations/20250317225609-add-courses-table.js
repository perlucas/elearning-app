'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('courses', {
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
            instructor_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            stats: {
                type: Sequelize.JSONB,
                allowNull: false,
                defaultValue: {},
                comment:
                    'Used to save usage metrics and useful statistics (e.g. to prevent deleting a course already purchased)',
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
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('courses', { cascade: true });
    },
};
