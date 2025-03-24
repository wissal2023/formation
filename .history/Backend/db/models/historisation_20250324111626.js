'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import User model (assuming historisation is related to users)
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const Historisation = sequelize.define('Historisation', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  action: {  // Description of the historical action
    type: DataTypes.STRING,
    allowNull: false
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
  freezeTableName: true, // Keeps table name as 'historisation'
  modelName: 'historisation'
});

 // ✅ Register Associations
 Historisation.associate = (models) => {
  Historisation.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
};

return Historisation;
};
