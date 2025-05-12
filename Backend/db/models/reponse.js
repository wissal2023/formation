'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reponse = sequelize.define('Reponse', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    reponseText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pairIndex: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Used for Match-type questions to link pairs'
    },
    orderIndex: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Used for Reorganize-type questions to store correct order'
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Questions',
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
    timestamps: true,
    tableName: 'Reponses'
  });

  Reponse.associate = (models) => {
    Reponse.belongsTo(models.Question, {
      foreignKey: 'questionId',
      onDelete: 'CASCADE'
    });
  };

  return Reponse;
};
