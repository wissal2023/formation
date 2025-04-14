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
      type: DataTypes.JSONB,
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
  Historisation.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
};

  return Historisation;
};
