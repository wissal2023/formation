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
User.hasMany(Formation, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Formation.belongsTo(User, { foreignKey: 'user_id' });

// User => Historisation (One-to-Many)
User.hasMany(Historisation, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Historisation.belongsTo(User, { foreignKey: 'user_id' });

// User => DailyStreak (One-to-One)
User.hasOne(DailyStreak, { foreignKey: 'user_id', onDelete: 'CASCADE' });
DailyStreak.belongsTo(User, { foreignKey: 'user_id' });

Quiz.hasOne(Certification, { foreignKey: 'quiz_id', onDelete: 'CASCADE'})
Certification.belongsTo(Quiz, { foreignKey: 'quiz_id' });

// Quiz -> Recompense (One-to-One)
Quiz.hasOne(Recompense, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
Recompense.belongsTo(Quiz, { foreignKey: 'quiz_id' });

Quiz.hasMany(Question, { foreignKey: 'quiz_id' });
Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });

Quiz.hasMany(QuizProg, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
QuizProg.belongsTo(Quiz, { foreignKey: 'quiz_id' });

    
Question.hasMany(Reponse, { foreignKey: 'question_id' , });
Reponse.belongsTo(Question, { foreignKey: 'question_id' });

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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
