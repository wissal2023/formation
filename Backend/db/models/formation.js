const { Sequelize, DataTypes } = require('sequelize');
const { TYPE_FLAG } = require('../constants/typeFlag');

module.exports = (sequelize, DataTypes) => {
  const Formation = sequelize.define('Formation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    titre: { type: DataTypes.STRING },
    thematique: { type: DataTypes.STRING },
    verouillee: { type: DataTypes.BOOLEAN, defaultValue: false },
    typeFlag: { type: DataTypes.ENUM(...TYPE_FLAG), allowNull: false,},
    statusFormation: { type: DataTypes.ENUM('created','finished'), allowNull: false,},
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
    tableName: 'Formations',
  });

  // Associations
  Formation.associate = (models) => {
    Formation.belongsToMany(models.User, {through: 'UserFormations', foreignKey: 'formationId', otherKey: 'userId',});
    Formation.hasOne(models.FormationDetails, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Evaluation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.NoteDigitale, { foreignKey: 'formationId', onDelete: 'CASCADE' });    
    Formation.hasOne(models.Historisation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
  
  
  };

  return Formation;
};