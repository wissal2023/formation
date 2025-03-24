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

Formation.associate = (models) => {
  models.Document.belongsTo(Formation, { foreignKey: 'formation_id' });
  Formation.associate = (models) => {
  // ✅ Formation has many NoteDigitale (One-to-Many)
  models.NoteDigitale.belongsTo(Formation, { foreignKey: 'formation_id' });

  // ✅ Formation has many Video (One-to-Many)
  models.Video.belongsTo(Formation, { foreignKey: 'formation_id' });

  // ✅ Formation has many Evaluation (One-to-Many)
  models.Evaluation.belongsTo(Formation, { foreignKey: 'formation_id' });
return Document;
};
