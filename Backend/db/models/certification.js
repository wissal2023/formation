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
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Quiz', 
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
      allowNull: true
      }
  }, {
    paranoid: true, 
    freezeTableName: true
  });


  // Define associations
  Certification.associate = (models) => {
    Certification.belongsTo(models.Formation, { foreignKey: 'formationId', onDelete: 'CASCADE' }); // Now linked to Formation
  };

  return Certification;
};
