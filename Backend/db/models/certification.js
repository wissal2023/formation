const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Corrected to use the sequelize instance

module.exports = (sequelize, DataTypes) => {
  const Certification = sequelize.define('Certification', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateObtention: {
      type: DataTypes.DATE,
      allowNull: false
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false
    },
    formationId: {  // Changed to formationId to link certification with the course
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Formation', 
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW  // Sequelize.NOW is the correct way to set the default value
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW  // Sequelize.NOW is the correct way to set the default value
    }
  }, {
    paranoid: true,  // Soft delete
    freezeTableName: true
  });

  // Define associations
  Certification.associate = (models) => {
    Certification.belongsTo(models.Formation, { foreignKey: 'formationId', onDelete: 'CASCADE' }); // Now linked to Formation
  };

  return Certification;
};
