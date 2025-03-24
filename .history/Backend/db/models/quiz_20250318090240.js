'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models
const ProgressQuiz = require('./progressQuiz');
const Certification = require('./certification');
const Recompense = require('./recompense');
const Question = require('./question');

const Quiz = sequelize.define('quiz', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  totalScore: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  tentatives: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false
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
  freezeTableName: true, // Keeps table name as 'quiz'
  modelName: 'quiz'
});

// ✅ Define Associations

// Quiz -> ProgressQuiz (One-to-One)
Quiz.hasOne(ProgressQuiz, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
ProgressQuiz.belongsTo(Quiz, { foreignKey: 'quiz_id' });

// Quiz -> Certification (One-to-Many)
Quiz.hasMany(Certification, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
Certification.belongsTo(Quiz, { foreignKey: 'quiz_id' });

// Quiz -> Recompense (One-to-One)
Quiz.hasOne(Recompense, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
Recompense.belongsTo(Quiz, { foreignKey: 'quiz_id' });

Quiz.hasMany(Question, { foreignKey: 'quiz_id' });
Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });

module.exports = Quiz;
