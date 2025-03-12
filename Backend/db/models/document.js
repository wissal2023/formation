'use strict';
const {Model, Sequelize} = require('sequelize');
const sequelize = require('../../config/database');

const document = sequelize.define('document', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  filename: {
    type: Sequelize.STRING
  },
  filetype: {
    type: Sequelize.STRING
  },
  uploadedDate: {
    type: Sequelize.DATE
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
  modelName:'document',
})

// association:
/*
document.hasOne(formation, {foreignKey: 'createdBy'}); // formation => document : OneToMany
formation.belongsTo(document, { foreignKey: 'createdBy'});
*/

module.exports = document;