'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HelpTranslations', { 
      id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    page: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    language: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'en'
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
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
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    deletedAt: {
        type: Sequelize.DATE
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HelpTranslations');
  }
};