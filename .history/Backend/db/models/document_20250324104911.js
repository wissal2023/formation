'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filetype: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploadedDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
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
  paranoid: true,
  freezeTableName: true,
  modelName: 'document',
});


return Document
};
