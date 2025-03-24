'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models (if applicable)
const User = require('./user');
const Formation = require('./formation'); // If evaluations are for formations
const Quiz = require('./quiz'); // If evaluations are for quizzes

module.exports = (sequelize, DataTypes) => {
  const Evaluation = sequelize.define('Evaluation', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombrePoint: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  commentaire: {
    type: DataTypes.STRING,
    allowNull: true
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
  freezeTableName: true, // Keeps table name as 'evaluation'
  modelName: 'evaluation'
});

Formation.associate = (models) => {
  // ✅ Formation has many Evaluation (One-to-Many)
  models.Evaluation.belongsTo(Formation, { foreignKey: 'formation_id' });

return Evaluation;
};
