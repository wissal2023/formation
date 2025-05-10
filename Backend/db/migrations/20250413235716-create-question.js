'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionText: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quizId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Quiz', // Ensure this matches the table name for Quiz
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      optionType: {
        type: Sequelize.ENUM('Multiple_choice', 'single_choice', 'reorganize', 'match', 'drag_drop'),
        allowNull: false
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
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Paranoid option is not directly set in the migration but handled in the model
    // The `deletedAt` column is already included for soft delete functionality
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};
