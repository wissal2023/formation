'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models
const Question = require('./question');

module.exports = (sequelize, DataTypes) => {
  const Reponse = sequelize.define('Reponse', {
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


return Reponse;
};