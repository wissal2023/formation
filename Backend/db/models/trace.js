'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Trace = sequelize.define('Trace', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    page: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'view'
    },
    metadata: {
      type: DataTypes.JSONB, 
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
deletedAt: {
    type: DataTypes.DATE
  }
  }, {
    freezeTableName: true,
    paranoid: false
  });

  Trace.associate = (models) => {
    Trace.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE'});};

  return Trace;
};
