'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');


const DailyStreak = sequelize.define('dailyStreak', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombreStreak: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  user_id: {  // Foreign key to associate with User
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
  }
}, {
  paranoid: true, // Enables soft delete
  freezeTableName: true, // Keeps table name as 'dailyStreak'
  modelName: 'dailyStreak'
});


