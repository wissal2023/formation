'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'supabaseUserId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'supabaseUserId', {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true
    });
  }
};