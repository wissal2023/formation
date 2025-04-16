'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormationDetails = sequelize.define('FormationDetails', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    duree: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    plan: {
      type: DataTypes.JSON, // or DataTypes.ARRAY (am using PostgreSQL)
      allowNull: true
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
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'FormationDetails'
  });

  // Association
  FormationDetails.associate = (models) => {
    FormationDetails.hasMany(models.Video, { foreignKey: 'formationDetailsId', onDelete: 'CASCADE' });
    FormationDetails.hasMany(models.Document, { foreignKey: 'formationDetailsId', onDelete: 'CASCADE' });
    FormationDetails.belongsTo(models.Formation, {foreignKey: 'formationId', onDelete: 'CASCADE'});
  };

  return FormationDetails;
};
