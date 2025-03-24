'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


// ✅ Explicitly Define Associations Here
const { User, Historisation, Formation, DailyStreak, Recompense, Evaluation, NoteDigitale } = db;

// User → Formation (One-to-Many)
User.hasMany(Formation, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Formation.belongsTo(User, { foreignKey: 'user_id' });

// User → Historisation (One-to-Many)
User.hasMany(Historisation, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Historisation.belongsTo(User, { foreignKey: 'user_id' });

// User → DailyStreak (One-to-One)
User.hasOne(DailyStreak, { foreignKey: 'user_id', onDelete: 'CASCADE' });
DailyStreak.belongsTo(User, { foreignKey: 'user_id' });

// User → Recompense (One-to-Many)
User.hasMany(Recompense, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Recompense.belongsTo(User, { foreignKey: 'user_id' });

// User → Evaluation (One-to-Many)
User.hasMany(Evaluation, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Evaluation.belongsTo(User, { foreignKey: 'user_id' });

// User → NoteDigitale (One-to-Many)
User.hasMany(NoteDigitale, { foreignKey: 'user_id', onDelete: 'CASCADE' });
NoteDigitale.belongsTo(User, { foreignKey: 'user_id' });

// Many-to-Many Relationship (User ↔ Formation)
User.belongsToMany(Formation, { through: 'UserFormation', foreignKey: 'user_id', onDelete: 'CASCADE' });
Formation.belongsToMany(User, { through: 'UserFormation', foreignKey: 'formation_id', onDelete: 'CASCADE' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
