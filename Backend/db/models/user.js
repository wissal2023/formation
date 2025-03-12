'use strict';
const {Model, Sequelize} = require('sequelize');
const sequelize = require('../../config/database');
const historisation = require('./historisation');
const formation = require('./formation');


const user = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  mdp: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.ENUM('Admin', 'Formateur', 'Apprenant'),
    allowNull: false,
  },
  dateInscr: {
    type: Sequelize.DATE
  },
  derConnx: {
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
  modelName:'user',
});


// association:
user.hasMany(historisation, {foreignKey: 'createdBy'}); // user => historisation : OneToMany
historisation.belongsTo(user, { foreignKey: 'createdBy'});

user.hasMany(formation, {foreignKey: 'createdBy'}); // user => formation : OneToMany
formation.belongsTo(user, { foreignKey: 'createdBy'});
/*
user.hasOne(streaks, {foreignKey: 'createdBy'}); // user => streaks : OneToMany
streaks.belongsTo(user, { foreignKey: 'createdBy'});
*/
module.exports = user;