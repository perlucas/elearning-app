'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('purchasables', {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: '',
                comment: 'Maps to the title of the purchasable item',
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: '',
            },
            type: {
                type: Sequelize.ENUM('course', 'module', 'lecture'),
                allowNull: false,
            },
            course_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'courses',
                    key: 'id',
                },
                allowNull: true,
            },
            module_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'modules',
                    key: 'id',
                },
                allowNull: true,
            },
            lecture_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'lectures',
                    key: 'id',
                },
                allowNull: true,
            },
            instructor_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                allowNull: false,
            },
            category_id: {
                type: Sequelize.INTEGER,
                comment: 'No categories table, will keep a local btree',
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('active', 'draft'),
                allowNull: false,
            },
            keywords: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                defaultValue: [],
            },
            released_at: {
                type: Sequelize.DATE,
            },
            duration: {
                type: Sequelize.INTEGER,
                comment: 'in minutes',
            },
            approx_num_students: {
                type: Sequelize.INTEGER,
                comment: 'approx. number of students that purchased this one',
            },
            average_rank: {
                type: Sequelize.FLOAT,
                comment: 'average rank according to student feedbacks',
            },
        });

        await queryInterface.addIndex('purchasables', {
            name: 'course_id_index',
            fields: ['course_id'],
        });
        await queryInterface.addIndex('purchasables', {
            name: 'module_id_index',
            fields: ['module_id'],
        });
        await queryInterface.addIndex('purchasables', {
            name: 'lecture_id_index',
            fields: ['lecture_id'],
        });
        await queryInterface.addIndex('purchasables', {
            name: 'instructor_id_index',
            fields: ['instructor_id'],
        });
        await queryInterface.addIndex('purchasables', {
            name: 'status_index',
            fields: ['status'],
        });
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
     */
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('purchasables', { cascade: true });
    },
};
