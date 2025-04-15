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
      defaultValue: Sequelize.NOW
    },
    formationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Formations',  // Ensure this references the 'Formations' table
        key: 'id'
      },
      onDelete: 'CASCADE'  // Ensure the document is deleted if the associated formation is deleted
    },
    file_data: {  // This will store the actual document content as binary (BLOB)
      type: DataTypes.BLOB('long'),  // BLOB (long) for larger files
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
    },
    deletedAt: {
      type: DataTypes.DATE,
    }
  }, {
    paranoid: true,  // Enables soft delete
    timestamps: true,  // Automatically adds createdAt and updatedAt timestamps
    freezeTableName: true,  // Prevents Sequelize from pluralizing table name
  });

  // Associations
  Document.associate = (models) => {
    // A document belongs to a formation (course)
    Document.belongsTo(models.Formation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
  };

  return Document;
};
