'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true, 
      validate: { isEmail: true } 
    },
    mdp: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: { len: [6, 255] } 
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Formateur', 'Apprenant'),
      allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'User',
  });

  // Associations
  User.associate = (models) => {
    User.hasMany(models.Formation, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Historisation, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasOne(models.DailyStreak, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return User;
};
