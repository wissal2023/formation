'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const NoteDigitale = sequelize.define('NoteDigitale', {
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
    timestamps: true,
    paranoid: true, // Enables soft delete
    freezeTableName: true
  });

  // Associations
  NoteDigitale.associate = (models) => {
    NoteDigitale.belongsTo(models.Formation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
  };

  return NoteDigitale;
};
