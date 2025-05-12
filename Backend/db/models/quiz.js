'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
        model: 'FormationDetails',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    paranoid: true,
    freezeTableName: true,
    timestamps: true,
    tableName: 'Quiz'
  });

  Quiz.associate = (models) => {
    Quiz.belongsTo(models.FormationDetails, {
      foreignKey: 'formationDetailsId',
      onDelete: 'CASCADE'
    });

    Quiz.hasOne(models.Certification, {
      foreignKey: 'quizId',
      onDelete: 'CASCADE'
    });

    Quiz.hasMany(models.Question, {
      foreignKey: 'quizId',
      onDelete: 'CASCADE'
    });

    Quiz.hasMany(models.QuizProg, {
      foreignKey: 'quizId',
      onDelete: 'CASCADE'
    });
  };

  return Quiz;
};
