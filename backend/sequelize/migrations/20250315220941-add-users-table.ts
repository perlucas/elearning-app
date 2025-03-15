'use strict';

import { QueryInterface } from 'sequelize';
type SequelizePackage = typeof import('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: SequelizePackage) {
        await queryInterface.createTable('users', {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                unique: true,
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            birth_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            avatar_url: {
                type: Sequelize.STRING,
            },
            config: {
                type: Sequelize.JSONB,
                allowNull: false,
                defaultValue: {},
            },
            stats_feedback: {
                type: Sequelize.JSONB,
                allowNull: false,
                defaultValue: {},
            },
        });

        // await queryInterface.addIndex todo: add index
    },

    async down(queryInterface, Sequelize) {},
};
