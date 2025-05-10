'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quiz', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalScore: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      tentatives: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      difficulty: {
        type: Sequelize.ENUM('easy', 'medium', 'hard'),
        allowNull: false
      },
      formationDetailsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'FormationDetails',
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
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    });

    // Add associations for related models (not handled directly in the migration, but for clarity):
    // - Quiz has many Questions
    // - Quiz has many QuizProgs
    // - Quiz has one Certification
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quiz');
  }
};
