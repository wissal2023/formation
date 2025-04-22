'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
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
    duree: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nomSection: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nbreSection: {
      type: DataTypes.STRING,
      allowNull: true
    },
    formationDetailsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FormationDetails',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'Videos'

  });

  // Associations
  Video.associate = (models) => {
    Video.belongsTo(models.FormationDetails, { foreignKey: 'formationDetailsId', onDelete: 'CASCADE' });
  };
  
  
  
  return Video;
};
