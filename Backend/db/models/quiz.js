'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    totalScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    tentatives: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false
    },
    formationDetailsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Formations', 
        key: 'id'
      },
      onDelete: 'CASCADE'
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
    paranoid: true,
    freezeTableName: true,
    timestamps: true
  });

  // Associations
  Quiz.associate = (models) => {
    Quiz.belongsTo(models.FormationDetails, { foreignKey: 'formationDetailsId', onDelete: 'CASCADE' });
    Quiz.hasOne(models.Certification, { foreignKey: 'quizId', onDelete: 'CASCADE' });
    Quiz.hasMany(models.Question, { foreignKey: 'quizId', onDelete: 'CASCADE' });
    Quiz.hasMany(models.QuizProg, { foreignKey: 'quizId', onDelete: 'CASCADE' });
 
  };
  

  return Quiz;
};
