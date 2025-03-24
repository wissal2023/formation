'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models
const Question = require('./question');

const Reponse = sequelize.define('reponse', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  reponseText: {  // Renamed 'reponses' to be more meaningful
    type: DataTypes.STRING,
    allowNull: false
  },
  is_correct: {  
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  question_id: {  // Foreign key linking to Question
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'question',
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
  freezeTableName: true, // Keeps table name as 'reponse'
  modelName: 'reponse'
});


module.exports = Reponse;
