'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Helps', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      page: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'The route or component/page this help entry is for'
      },
      section: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Optional section or element within the page'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Short title or headline for the help tip'
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Detailed help message shown to the user'
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'fr',
        comment: 'Language code (e.g., fr, en, ar)'
      },
      role: {
        type: Sequelize.ENUM('Admin', 'Formateur', 'Apprenant'),
        allowNull: false,
        defaultValue: 'Admin',
        comment: 'User role this help tip is for'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: 'Used to deactivate help without deleting'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Helps');
  }
};