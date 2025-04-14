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
      helpId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Helps',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      languageCode: {
        type: Sequelize.STRING(5),
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.addIndex('HelpTranslations', ['helpId']);
    await queryInterface.addIndex('HelpTranslations', ['languageCode']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HelpTranslations');
  }
};
