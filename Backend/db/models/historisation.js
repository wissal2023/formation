// db/models/historisation.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Historisation = sequelize.define('Historisation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    action: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    deleted_data: { 
      type: DataTypes.JSONB,
      allowNull: true
    },
    formation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Formations',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    paranoid: true,
    freezeTableName: true,
    tableName: 'Historisations',
    modelName: 'Historisation'
  });

  Historisation.associate = (models) => {
    Historisation.belongsTo(models.Formation, {
      foreignKey: 'formation_id',
      onDelete: 'SET NULL'
    });

    Historisation.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return Historisation;
};