// db/models/formation.js
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
    thematique: { type: DataTypes.STRING },
    verouillee: { type: DataTypes.BOOLEAN, defaultValue: false },
    typeFlag: { type: DataTypes.ENUM('Obligatoire', 'Facultat'), allowNull: false,},
    status: { type: DataTypes.ENUM('enrolled', 'in_progress', 'completed'), allowNull: false,},
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'id'}},
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
      type: DataTypes.DATE,
      allowNull: true
      }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'Formations',
  });

  // Associations
  Formation.associate = (models) => {
    Formation.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Formation.hasOne(models.FormationDetails, { foreignKey: 'formationId', onDelete: 'CASCADE'});    
    Formation.hasMany(models.Evaluation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.NoteDigitale, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Document, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Quiz, { foreignKey: 'formationId', onDelete: 'CASCADE' });
};

  return Formation;
};
