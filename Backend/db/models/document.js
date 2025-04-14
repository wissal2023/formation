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
    },
    deletedAt: {
      type: DataTypes.DATE,
    }
  }, {
    paranoid: true,
    timestamps: true,
    freezeTableName: true
  });
  
Document.associate = (models) => {
  Document.belongsTo(models.Formation, { foreignKey: 'formation_id' });
}

    return Document;
};
