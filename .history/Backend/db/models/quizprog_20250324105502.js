'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models
const Quiz = require('./quiz');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const quizProg = sequelize.define('quizProg', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  completed: {  // Fixed spelling
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  pointGagne: {  // Fixed spelling
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  quiz_id: {  // Foreign key linking to Quiz
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'quiz',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  user_id: {  // Foreign key linking to User
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    },
    onDelete: 'CASCADE'
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
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true, // Enables soft delete
  freezeTableName: true, // Keeps table name as 'quizProg'
  modelName: 'quizProg'
});


module.exports = QuizProg;
