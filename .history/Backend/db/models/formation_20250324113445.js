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
    Formation.hasMany(models.Video, { foreignKey: 'formation_id', onDelete: 'CASCADE' });
    Formation.hasMany(models.Evaluation, { foreignKey: 'formation_id', onDelete: 'CASCADE' });
  };

  return Formation;
};


