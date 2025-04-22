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
    multipleChoice: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Quiz',
        key: 'id',
      },
      onDelete: 'CASCADE',
    }
  }, {
    freezeTableName: true, 
  });

  Question.associate = (models) => {
    Question.hasMany(models.Reponse, { foreignKey: 'questId' });
  };

  return Question;
};
