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




module.exports = Formation;
