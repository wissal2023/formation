// db/models/user.js
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
    roleUtilisateur: {
      type: DataTypes.ENUM('Admin', 'Formateur', 'Apprenant'),
      allowNull: false,
    },
    dateInscr: {
      type: DataTypes.DATE
    },
    derConnx: {
      type: DataTypes.DATE
    },
    supabaseUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    }    
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true, 
    tableName: 'Users'
  });

  // Associations
  User.associate = (models) => {
    User.hasMany(models.Formation, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasOne(models.DailyStreak, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Trace, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Help, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasOne(models.Recompense, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return User;
};
