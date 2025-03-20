'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('promotions', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                allowNull: false,
                comment: 'sensitive entity, protect using uuid as pk',
            },
            discount_perc: {
                type: Sequelize.FLOAT,
                allowNull: false,
                comment: 'discount percentage to apply to product price',
            },
            apply_since: {
                type: Sequelize.DATE,
            },
            apply_to: {
                type: Sequelize.DATE,
            },
            unbounded: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                comment: 'true means the promotion never expires',
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
        });

        await queryInterface.addIndex('promotions', { name: 'user_id_index', fields: ['user_id'] });

        await queryInterface.addColumn('purchasables', 'promotion_id', {
            type: Sequelize.UUID,
            references: {
                model: 'promotions',
                key: 'id',
            },
            allowNull: true,
        });
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async down(queryInterface, _Sequelize) {
        await queryInterface.removeColumn('purchasables', 'promotion_id');

        await queryInterface.dropTable('promotions', { cascade: true });
    },
};
