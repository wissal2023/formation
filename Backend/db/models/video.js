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
    formationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Formations',
        key: 'id'
      }
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
    paranoid: true,
    timestamps: true,
    freezeTableName: true
  });

  // Associations
  Video.associate = (models) => {
    Video.belongsTo(models.Formation, { 
      foreignKey: { name: 'formationId', allowNull: false },
      onDelete: 'CASCADE' 
    });
  };
  
  
  
  return Video;
};
