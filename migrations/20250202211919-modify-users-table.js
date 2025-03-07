'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Users', 'credential');
        await queryInterface.addColumn('Users', 'role', {
            type: Sequelize.ENUM('Admin', 'Vendedor'),
            allowNull: false,
            defaultValue: 'Vendedor'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Users', 'credential', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        });
        await queryInterface.removeColumn('Users', 'role');
    }
};
