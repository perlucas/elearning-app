'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('student_feedbacks', {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
            },
            enrollment_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'enrollments',
                    key: 'id',
                },
            },
            score: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'rank from 1 to 5',
            },
            comment: {
                type: Sequelize.STRING,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        await queryInterface.addIndex('student_feedbacks', {
            name: 'student_feedbacks_enrollment_id_index',
            fields: ['enrollment_id'],
        });
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('student_feedbacks', { cascade: true });
    },
};
