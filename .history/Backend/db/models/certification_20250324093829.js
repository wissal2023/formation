'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Quiz = require('./quiz');


const Certification = sequelize.define('certification', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateObtention: {
    type: DataTypes.DATE,
    allowNull: false
  },
  statut: {
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
  paranoid: true, 
  freezeTableName: true, 
  modelName: 'certification'
});

Certification.hasOne(Quiziz, { foreignKey: 'quiz_id', onDelete: 'CASCADE'})
Quiz.belongsTo(Certification, { foreignKey: 'quiz_id' });

module.exports = Certification;