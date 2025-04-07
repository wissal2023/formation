'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Evaluation = sequelize.define('Evaluation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nbPoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    commentaire: {
      type: DataTypes.STRING,
      allowNull: true
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
    timestamps: true,
    paranoid: true, // Enables soft delete
    freezeTableName: true
  });

  // Associations
  Evaluation.associate = (models) => {
    Evaluation.belongsTo(models.Formation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
  };
  
  return Evaluation;
};
