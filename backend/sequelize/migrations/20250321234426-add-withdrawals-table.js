'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('withdrawals', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                allowNull: false,
                comment: 'sensitive entity, protect using uuid as pk',
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            status: {
                type: Sequelize.ENUM('pending', 'completed'),
                allowNull: false,
            },
            amount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            fees_perc: {
                type: Sequelize.FLOAT,
                allowNull: false,
                comment: 'percentage of fees over the amount',
            },
            details: {
                type: Sequelize.JSONB,
                allowNull: false,
                defaultValue: {},
            },
            completed_at: {
                type: Sequelize.DATE,
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

        await queryInterface.addIndex('withdrawals', {
            name: 'withdrawals_user_id_index',
            fields: ['user_id'],
        });

        await queryInterface.addColumn('enrollments', 'withdrawal_id', { type: Sequelize.UUID });
        await queryInterface.addIndex('enrollments', {
            name: 'enrollments_withdrawal_id_index',
            fields: ['withdrawal_id'],
        });
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async down(queryInterface, _Sequelize) {
        await queryInterface.removeIndex('enrollments', 'enrollments_withdrawal_id_index');

        await queryInterface.removeColumn('enrollments', 'withdrawal_id');

        await queryInterface.dropTable('withdrawals', { cascade: true });
    },
};
