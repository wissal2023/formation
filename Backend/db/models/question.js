'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    questionText: {
      type: DataTypes.STRING,
      allowNull: false
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
    optionType: {
      type: DataTypes.ENUM('Multiple_choice', 'single_choice', 'reorganize', 'match', 'drag_drop'),
      allowNull: false
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
    tableName: 'Questions'
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Quiz, {
      foreignKey: 'quizId',
      onDelete: 'CASCADE'
    });

    Question.hasMany(models.Reponse, {
      foreignKey: 'questionId',
      onDelete: 'CASCADE'
    });
  };

  return Question;
};
