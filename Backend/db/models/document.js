'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filetype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uploadedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    formationDetailsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FormationDetails', 
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
      type: DataTypes.DATE,
    }
  }, {
    paranoid: true,  // Enables soft delete
    timestamps: true,  // Automatically adds createdAt and updatedAt timestamps
  });

  // Associations
  Document.associate = (models) => {
    Document.belongsTo(models.FormationDetails, { foreignKey: 'formationDetailsId', onDelete: 'CASCADE' });
  };

  return Document;
};
