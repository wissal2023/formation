'use strict';
module.exports = (sequelize, DataTypes) => {
  const Formation = sequelize.define('Formation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    titre: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    duree: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true
  });

  // ✅ Register Associations
  Formation.associate = (models) => {
    Formation.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  };

  return Formation;
};


/* do the same for 
Formation.hasMany(Quiz, { foreignKey: 'formation_id', onDelete: 'CASCADE' });
Quiz.belongsTo(Formation, { foreignKey: 'formation_id' });

Formation.hasMany(Document, { foreignKey: 'formation_id' });
Document.belongsTo(Formation, { foreignKey: 'formation_id' });

Formation.hasMany(NoteDigitale, { foreignKey: 'formation_id' });
NoteDigitale.belongsTo(Formation, { foreignKey: 'formation_id' });

Formation.hasMany(video, { foreignKey: 'formation_id' });
video.belongsTo(Formation, { foreignKey: 'formation_id' });

Formation.hasMany(Evaluation, { foreignKey: 'formation_id' });
Evaluation.belongsTo(Formation, { foreignKey: 'formation_id' });
*/

