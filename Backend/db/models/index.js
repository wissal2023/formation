<<<<<<< HEAD
// backend/db/models/index.js
=======
>>>>>>> 1e23dff235148ea471067dc6098d4b690b35f8bd
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const db = {};

// Charger tous les modèles dynamiquement
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js')) 
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Associer les modèles
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
