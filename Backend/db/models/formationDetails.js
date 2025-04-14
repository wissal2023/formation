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
    evaluation: {
      type: DataTypes.FLOAT,
      defaultValue: 0
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
    }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'FormationDetails'
  });

  // Association
  FormationDetails.associate = (models) => {
    FormationDetails.belongsTo(models.Formation, {foreignKey: 'formationId', onDelete: 'CASCADE'});
  };

  return FormationDetails;
};
