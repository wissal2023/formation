'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    questionText: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Quiz', 
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  optionQuet: {
    type: DataTypes.ENUM('Multiple_choice', 'Yes/No', 'reorginize', 'Match', 'Drag/Drop'),
    allowNull: false
  },

    paranoid: true,
  });

  // Associations
  Question.associate = (models) => {
    Question.hasMany(models.Reponse, { foreignKey: 'questId' });
    Question.belongsTo(models.Quiz, { foreignKey: 'quizId', onDelete: 'CASCADE' });
  };

  return Question;
};
