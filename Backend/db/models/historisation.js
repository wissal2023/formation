'use strict';
const { Sequelize, DataTypes } = require('sequelize');

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
    deleted_data: { 
      type: DataTypes.JSONB,  // This will store metadata related to videos and documents
      allowNull: false
    },
    file_data: {  // This will store the actual file content as BLOB (Binary Large Object)
      type: DataTypes.BLOB('long'),  // 'long' for large binary data
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
      type: DataTypes.DATE
    }
  }, {
    paranoid: true, // Enables soft delete (for historisation itself)
    freezeTableName: true,
    modelName: 'Historisations'
  });

  // Associations
  Historisation.associate = (models) => {
    // Associating with Formation (general course info)
    Historisation.belongsTo(models.Formation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    
    // Associating with FormationDetails (for video or document content)
    Historisation.belongsTo(models.FormationDetails, { foreignKey: 'formationDetailId', onDelete: 'CASCADE' });

    // Associating with Document (for actual document data)
    Historisation.belongsTo(models.Document, { foreignKey: 'documentId', onDelete: 'CASCADE' });

    // Optionally associate with User if you want to track the user who archived the course
    Historisation.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return Historisation;
};
