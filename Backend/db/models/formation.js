'use strict';
const {Model, Sequelize} = require('sequelize');
const sequelize = require('../../config/database');

const formation = sequelize.define('formation', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
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
  modelName:'formation',
})

// association:
/*
formation.hasMany(document, {foreignKey: 'createdBy'}); // formation => document : OneToMany
document.belongsTo(formation, { foreignKey: 'createdBy'});
*/
module.exports = formation;