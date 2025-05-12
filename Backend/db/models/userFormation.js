// db/models/userFormation.js
'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const UserFormation = sequelize.define('UserFormation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      allowNull: false,
    },
    formationId: {
      type: DataTypes.INTEGER,
      references: { model: 'Formations', key: 'id' },
        onDelete: 'CASCADE',
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('enrolled', 'in_progress', 'completed'),
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'UserFormations',
  });

  // Associations
  UserFormation.associate = (models) => {
    UserFormation.belongsTo(models.User, { foreignKey: 'userId' });
    UserFormation.belongsTo(models.Formation, { foreignKey: 'formationId' });
  };

  return UserFormation;
};
