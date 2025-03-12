'use strict';
const {Model, Sequelize} = require('sequelize');
const sequelize = require('../../config/database');
const { use } = require('../../routes/authRoute');


module.exports  = sequelize.define('historisation', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
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
  modelName:'historisation',
})

