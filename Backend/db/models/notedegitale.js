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
    content: {  
      type: DataTypes.TEXT,
      allowNull: false
    },
    formationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Formations',
        key: 'id'
      }
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
    
    tableName: 'NoteDigitales', // <-- ajouter cette ligne
    timestamps: true,
    paranoid: true,
    freezeTableName: true
  });

  // Associations
  NoteDigitale.associate = (models) => {
    NoteDigitale.belongsTo(models.Formation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
  };

  return NoteDigitale;
};
