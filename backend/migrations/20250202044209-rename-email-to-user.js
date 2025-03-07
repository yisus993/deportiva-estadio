module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'email', 'user');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'user', 'email');
  }
};
