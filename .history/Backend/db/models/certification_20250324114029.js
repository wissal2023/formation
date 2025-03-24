'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Quiz = require('./quiz');


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
  freezeTableName: true, 
  modelName: 'certification'
});

Recompense.associate = (models) => {
  Recompense.belongsTo(models.Quiz, { foreignKey: 'user_id' });
  

  models.Certification.belongsTo(Quiz, { foreignKey: 'quiz_id' });
  models.Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });
  models.QuizProg.belongsTo(Quiz, { foreignKey: 'quiz_id' });
};
return Certification;
};