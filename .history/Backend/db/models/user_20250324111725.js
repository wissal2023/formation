'use strict';
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
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    mdp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Formateur', 'Apprenant'),
      allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true
  });

  // ✅ Register Associations
  User.associate = (models) => {
    User.hasMany(models.Formation, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.hasMany(models.Historisation, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.hasOne(models.DailyStreak, { foreignKey: 'user_id', onDelete: 'CASCADE' });
 
  };

  return User;
};


/*
Formation.belongsTo(User, { foreignKey: 'user_id' });

// User => Historisation (One-to-Many)
Historisation.belongsTo(User, { foreignKey: 'user_id' });

// User => DailyStreak (One-to-One)
DailyStreak.belongsTo(User, { foreignKey: 'user_id' });

*/

