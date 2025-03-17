'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('modules', {
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
                comment: 'Used to order modules in a course',
            },
            course_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'courses',
                    key: 'id',
                },
            },
            stats: {
                type: Sequelize.JSONB,
                allowNull: false,
                defaultValue: {},
                comment:
                    'Used to save usage metrics and useful statistics (e.g. to prevent deleting a module already purchased)',
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

        await queryInterface.addIndex('modules', {
            fields: ['course_id'],
            name: 'modules_course_id_index',
        });
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('modules', { cascade: true });
    },
};
