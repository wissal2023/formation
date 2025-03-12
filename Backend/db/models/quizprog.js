'use strict';
const {Model, Sequelize} = require('sequelize');
const sequelize = require('../../config/database');


module.exports = sequelize.define('quizProg', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  competed: {
    type: Sequelize.BOOLEAN
  },
  competedAt: {
    type: Sequelize.DATE
  },
  poingagne: {
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
  modelName:'quizProg',
})
