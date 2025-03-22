'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('payments', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                allowNull: false,
                comment: 'sensitive entity, protect using uuid as pk',
            },
            status: {
                type: Sequelize.ENUM('pending', 'confirmed', 'error'),
                allowNull: false,
            },
            due_amount: {
                type: Sequelize.FLOAT,
                allowNull: false,
                comment: 'the amount the student has to pay',
            },
            confirmed_at: {
                type: Sequelize.DATE,
            },
            details: {
                type: Sequelize.JSONB,
                defaultValue: {},
                comment: 'used to store payment gateway metadata as well as payment attempts',
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

        await queryInterface.addColumn('carts', 'payment_id', {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'payments',
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
        await queryInterface.dropTable('payments', { cascade: true });
    },
};
