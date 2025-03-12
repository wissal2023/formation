'use strict';
const {Model, Sequelize} = require('sequelize');
const sequelize = require('../../config/database');


module.exports = sequelize.define('recompense', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  desc: {
    type: Sequelize.STRING
  },
  icon: {
    type: Sequelize.STRING
  },
  isUnlocked: {
    type: Sequelize.BOOLEAN
  },
  expDate: {
    type: Sequelize.DATE
  },
  awardedDate: {
    type: Sequelize.DATE
  },
  points: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
}, {
  paranoid:true,
  freezeTableName: true,
  modelName:'recompense',
})