'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models (if applicable)
const User = require('./user');
const Formation = require('./formation'); // If evaluations are for formations
const Quiz = require('./quiz'); // If evaluations are for quizzes

module.exports = (sequelize, DataTypes) => {
  const Evaluation = sequelize.define('Evaluation', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombrePoint: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  commentaire: {
    type: DataTypes.STRING,
    allowNull: true
  },
  user_id: {  // Who is evaluated?
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  formation_id: {  // If the evaluation is related to a Formation
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'formation',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  quiz_id: {  // If the evaluation is related to a Quiz
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'quiz',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  paranoid: true, // Enables soft delete
  freezeTableName: true, // Keeps table name as 'evaluation'
  modelName: 'evaluation'
});

return Evaluation};
