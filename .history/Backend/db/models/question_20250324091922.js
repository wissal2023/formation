'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models
const Quiz = require('./quiz');
const Reponse = require('./reponse');

const Question = sequelize.define('question', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  questionText: {
    type: DataTypes.STRING,
    allowNull: false
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
  freezeTableName: true, // Keeps table name as 'question'
  modelName: 'question'
});

    
Question.hasMany(Reponse, { foreignKey: 'question_id' ,  onDelete: 'CASCADE'});
Reponse.belongsTo(Question, { foreignKey: 'question_id' });

module.exports = Question;
