'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models
const Historisation = require('./historisation');
const Formation = require('./formation');
const DailyStreak = require('./dailystreak');
const Recompense = require('./recompense');
const Evaluation = require('./evaluation');
const NoteDigitale = require('./notedegitale');

const User = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mdp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Formateur', 'Apprenant'),
    allowNull: false,
  },
  dateInscr: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  derConnx: {
    type: DataTypes.DATE
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
    type: DataTypes.DATE,
  }
}, {
  paranoid: true, // Soft delete feature
  freezeTableName: true, // Keeps table name as 'user'
  modelName: 'user'
});


