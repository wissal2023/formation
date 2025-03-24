'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nomSection: {
    type: DataTypes.STRING,
    allowNull: true
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
  }
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: 'video'
});


Video.associate = (models) => {
  Video.belongsTo(modeFormation, { foreignKey: 'formation_id' });
}

Historisation.associate = (models) => {
  Historisation.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
};


return Video;
};