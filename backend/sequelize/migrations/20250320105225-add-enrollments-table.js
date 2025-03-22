'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('enrollments', {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            purchasable_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'purchasables',
                    key: 'id',
                },
            },
            cart_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'carts',
                    key: 'id',
                },
            },
            status: {
                type: Sequelize.ENUM('draft', 'pending_payment', 'active', 'cancelled'),
                allowNull: false,
            },
            started_at: {
                type: Sequelize.DATE,
                comment: 'date at when the payment got approved and completed',
            },
            progress: {
                type: Sequelize.JSONB,
                defaultValue: {},
                comment: 'store student progress in the current purchased item',
            },
            snapshot: {
                type: Sequelize.JSONB,
                defaultValue: {},
                comment: 'store purchased item snapshot from the time the cart was confirmed',
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

        await queryInterface.addIndex('enrollments', {
            name: 'enrollments_user_id_index',
            fields: ['user_id'],
        });

        await queryInterface.addIndex('enrollments', {
            name: 'enrollments_status_index',
            fields: ['status'],
        });

        await queryInterface.addIndex('enrollments', {
            name: 'enrollments_user_status_index',
            fields: ['user_id', 'status'],
        });

        await queryInterface.addIndex('enrollments', {
            name: 'enrollments_cart_id_index',
            fields: ['cart_id'],
        });
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('enrollments', { cascade: true });
    },
};
