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
    action: { // Description of the historical action
      type: DataTypes.STRING,
      allowNull: false
    },
    deleted_data: { // 🔥 Full data of the deleted item (e.g., a Document)
      type: DataTypes.JSONB,
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
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    paranoid: true, // Enables soft delete (for historisation itself)
    freezeTableName: true, // Keeps table name as 'Historisation'
    modelName: 'historisation'
  });
 // ✅ Register Associations
 Historisation.associate = (models) => {
  Historisation.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
};

  return Historisation;
};
