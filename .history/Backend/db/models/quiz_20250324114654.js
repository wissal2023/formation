'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models
const Certification = require('./certification');
const Recompense = require('./recompense');
const Question = require('./question');
const QuizProg = require('./quizprog');

module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
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


 // ✅ Define Associations Properly
 Quiz.associate = (models) => {
  Quiz.belongsTo(models.Formation, { foreignKey: 'formation_id', onDelete: 'CASCADE' });
  
  Quiz.hasOne(models.Certification, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
  Quiz.hasMany(models.Question, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
  Quiz.hasOne(models.Recompense, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
  Quiz.hasMany(models.QuizProg, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
};

return Quiz;
};

