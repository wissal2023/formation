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
      defaultValue: 0,
      validate: {
        min: 1, 
        max: 5, 
      }
    },
    commentaire: {
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
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
    paranoid: true, 
    freezeTableName: true
  });

  // Associations
  Evaluation.associate = (models) => {
    Evaluation.belongsTo(models.Formation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
  };
  
  return Evaluation;
};
