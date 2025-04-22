// db/models/help.js
'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Help = sequelize.define('Help', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    page: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'The route or component/page this help entry is for'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Short title or headline for the help tip'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Detailed help message shown to the user'
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'fr',
      comment: 'Language code (e.g., fr, en, ar)'
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Formateur', 'Apprenant'),
      defaultValue: 'Admin',
      allowNull: false,
      comment: 'User role this help tip is for'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Used to deactivate help without deleting'
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
        type: DataTypes.DATE
    }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'Helps'
  });

  // association
  Help.associate = (models) => {
    Help.hasMany(models.HelpTranslation, { foreignKey: 'helpId', onDelete: 'CASCADE' });
    Help.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE'});};

  return Help;
};
