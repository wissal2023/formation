'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Formation = sequelize.define('Formation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    titre: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    duree: { type: DataTypes.INTEGER },
    evaluation: { type: DataTypes.FLOAT, defaultValue: 0 },
    thematique: { type: DataTypes.STRING },
    datedebut: { type: DataTypes.DATE },
    datefin: { type: DataTypes.DATE },
    verouillee: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'Formations',
  });

  // Associations
  Formation.associate = (models) => {
    Formation.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Video, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Evaluation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.NoteDigitale, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Document, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Quiz, { foreignKey: 'formationId', onDelete: 'CASCADE' });
};

  return Formation;
};
