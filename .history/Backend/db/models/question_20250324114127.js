'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models
const Quiz = require('./quiz');
const Reponse = require('./reponse');

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  questionText: {
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
  paranoid: true, // Enables soft delete
  freezeTableName: true, // Keeps table name as 'question'
  modelName: 'question'
});

Question.associate = (models) => {
  Question.belongsTo(models.Quiz, { foreignKey: 'user_id' });
  
};
 /*   
Question.hasMany(Reponse, { foreignKey: 'question_id' , });
Reponse.belongsTo(Question, { foreignKey: 'question_id' });
*/
return Question;
};