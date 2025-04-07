'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


module.exports = (sequelize, DataTypes) => {
  const Certification = sequelize.define('Certification', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateObtention: {
    type: DataTypes.DATE,
    allowNull: false
  },
  statut: {
    type: DataTypes.STRING,
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
  }
}, {
  paranoid: true, 
  freezeTableName: true
});

Certification.associate = (models) => {
  Certification.belongsTo(models.Quiz, { foreignKey: 'QuizId', onDelete: 'CASCADE' });
};

return Certification;
};