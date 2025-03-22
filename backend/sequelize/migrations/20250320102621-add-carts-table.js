'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('carts', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                allowNull: false,
                comment: 'sensitive entity, protect using uuid as pk',
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            status: {
                type: Sequelize.ENUM('draft', 'purchased'),
                allowNull: false,
            },
            purchased_at: {
                type: Sequelize.DATE,
                comment: 'keeps the date at when the user confirmed and purchased the cart',
            },
            snapshot: {
                type: Sequelize.JSONB,
                defaultValue: {},
                comment: 'store purchased items snapshot at the time the user confirmed',
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

        await queryInterface.addIndex('carts', {
            name: 'carts_user_id_index',
            fields: ['user_id'],
        });
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('carts', { cascade: true });
    },
};
