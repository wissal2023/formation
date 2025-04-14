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
      defaultValue: Sequelize.NOW
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
    freezeTableName: true,
    timestamps: true
  });

  // Associations
  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Formation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Quiz.hasOne(models.Recompense, { foreignKey: 'quizId', onDelete: 'CASCADE' });
    Quiz.hasOne(models.Certification, { foreignKey: 'quizId', onDelete: 'CASCADE' });
    Quiz.hasMany(models.Question, { foreignKey: 'quizId', onDelete: 'CASCADE' });
    Quiz.hasMany(models.QuizProg, { foreignKey: 'quizId', onDelete: 'CASCADE' });
 
  };
  

  return Quiz;
};
