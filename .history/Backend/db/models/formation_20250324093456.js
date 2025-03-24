'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models
const User = require('./user');  
const Quiz = require('./quiz');
const Document = require('./document');
const Evaluation = require('./evaluation');
const NoteDigitale = require('./notedegitale');
const video = require('./video');
const Video = require('./video');

const Formation = sequelize.define('formation', {
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
  },
  evaluation: {
    type: DataTypes.INTEGER
  },
  thematique: {
    type: DataTypes.STRING
  },
  datedebut: {
    type: DataTypes.DATE
  },
  datefin: {
    type: DataTypes.DATE
  },
  verouillee: {
    type: DataTypes.BOOLEAN
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
  paranoid: true,
  freezeTableName: true,
  modelName: 'formation',
});


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

// ✅ User -> Formation (One-to-Many) [User as Creator]



module.exports = Formation;
