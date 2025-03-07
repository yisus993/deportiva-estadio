'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Products', 'description');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Products', 'description', {
            type: Sequelize.STRING,
            allowNull: false
        });
    }
};
