'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('reimbursements', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                allowNull: false,
                comment: 'sensitive entity, protect using uuid as pk',
            },
            status: {
                type: Sequelize.ENUM('pending', 'confirmed'),
                allowNull: false,
            },
            details: {
                type: Sequelize.JSONB,
                allowNull: false,
                defaultValue: {},
            },
            completed_at: {
                type: Sequelize.DATE,
                comment: 'the moment when the reimbursement was processed',
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

        await queryInterface.addColumn('enrollments', 'reimbursement_id', {
            type: Sequelize.UUID,
            references: {
                model: 'reimbursements',
                key: 'id',
            },
        });
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async down(queryInterface, _Sequelize) {
        await queryInterface.removeColumn('enrollments', 'reimbursement_id');

        await queryInterface.dropTable('reimbursements', { cascade: true });
    },
};
