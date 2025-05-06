'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true, // Enables soft delete
  freezeTableName: true
});

// Associations
Recompense.associate = (models) => {
  Recompense.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
};

return Recompense;
};