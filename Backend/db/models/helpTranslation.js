'use strict';

module.exports = (sequelize, DataTypes) => {
  const HelpTranslation = sequelize.define('HelpTranslation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    helpId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
