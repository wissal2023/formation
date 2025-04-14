'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models
const Quiz = require('./quiz');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const QuizProg = sequelize.define('QuizProg', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  completed: { 
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  pointGagne: {  
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Quiz', 
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
  paranoid: true, 
  freezeTableName: true
});

// Associations
QuizProg.associate = (models) => {
  QuizProg.belongsTo(models.Quiz, { foreignKey: 'quizId', onDelete: 'CASCADE' });
};
return QuizProg;
};