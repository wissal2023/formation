'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import User model (assuming notes belong to users)
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const NoteDigitale = sequelize.define('NoteDigitale', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  titre: {
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
  freezeTableName: true, // Keeps table name as 'noteDigitale'
  modelName: 'noteDigitale'
});

Formation.associate = (models) => {
  models.NoteDigitale.belongsTo(Formation, { foreignKey: 'formation_id' });


  }
return NoteDigitale;
};