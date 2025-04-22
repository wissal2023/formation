'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Historisation = sequelize.define('Historisation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    action: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    deleted_data: { 
      type: DataTypes.JSONB,  // This will store metadata related to videos and documents
      allowNull: false
    },
    file_data: {  // This will store the actual file content as BLOB (Binary Large Object)
      type: DataTypes.BLOB('long'),  // 'long' for large binary data
      allowNull: true
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
      type: DataTypes.DATE
    }
  }, {
    paranoid: true, // Enables soft delete (for historisation itself)
    freezeTableName: true,
    modelName: 'Historisations'
  });

  // Associations
  Historisation.associate = (models) => {
    Historisation.belongsTo(models.Formation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
  };

  return Historisation;
};
