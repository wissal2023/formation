'use strict';
const { Sequelize, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const HelpTranslation = sequelize.define('HelpTranslation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    helpId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Helps',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    languageCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: 'e.g., fr, en'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'HelpTranslations',
    timestamps: true,
    indexes: [
      {
        fields: ['helpId'],
      },
      {
        fields: ['languageCode'],
      }
    ]
  });

  //association
  HelpTranslation.associate = (models) => {
    HelpTranslation.belongsTo(models.Help, { foreignKey: 'helpId', onDelete: 'CASCADE'});
  };

  return HelpTranslation;
};
