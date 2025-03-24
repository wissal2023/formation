'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import related models
const User = require('./user');
const Quiz = require('./quiz');

module.exports = (sequelize, DataTypes) => {
  const Recompense = sequelize.define('Recompense', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {  // Fixed from `desc`
    type: DataTypes.STRING,
    allowNull: true
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isUnlocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  expDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  awardedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
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
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true, // Enables soft delete
  freezeTableName: true, // Keeps table name as 'recompense'
  modelName: 'recompense'
});

// ✅ Define Associations
 // ✅ Register Associations
 Recompense.associate = (models) => {
  Recompense.belongsTo(models.Quiz, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  

  models.Recompense.belongsTo(Quiz, { foreignKey: 'quiz_id' });
  models.Certification.belongsTo(Quiz, { foreignKey: 'quiz_id' });
  models.Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });
  models.QuizProg.belongsTo(Quiz, { foreignKey: 'quiz_id' });
};


return Recompense;
};