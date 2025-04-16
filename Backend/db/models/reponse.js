'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = (sequelize, DataTypes) => {
  const Reponse = sequelize.define('Reponse', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  reponseText: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  isCorrect: {  
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  questId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Question', 
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true, 
  freezeTableName: true
});


return Reponse;
};