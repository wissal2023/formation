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
    Formation.hasMany(models.Quiz, { foreignKey: 'formation_id', onDelete: 'CASCADE' });
    Formation.hasMany(models.Document, { foreignKey: 'formation_id', onDelete: 'CASCADE' });
    Formation.hasMany(models.NoteDigitale, { foreignKey: 'formation_id', onDelete: 'CASCADE' });

    // ✅ Formation has many Quiz (One-to-Many)
    models.Quiz.belongsTo(Formation, { foreignKey: 'formation_id' });

    // ✅ Formation has many Document (One-to-Many)
    models.Document.belongsTo(Formation, { foreignKey: 'formation_id' });

    // ✅ Formation has many NoteDigitale (One-to-Many)
    models.NoteDigitale.belongsTo(Formation, { foreignKey: 'formation_id' });

    // ✅ Formation has many Video (One-to-Many)
    models.Video.belongsTo(Formation, { foreignKey: 'formation_id' });

    // ✅ Formation has many Evaluation (One-to-Many)
    Formation.hasMany(models.Evaluation, { foreignKey: 'formation_id', onDelete: 'CASCADE' });
    models.Evaluation.belongsTo(Formation, { foreignKey: 'formation_id' });
  };

  return Formation;
};


/* do the same for these association
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

