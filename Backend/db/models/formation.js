
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Formation = sequelize.define('Formation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    titre: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    duree: { type: DataTypes.INTEGER },
    evaluation: {
      type: DataTypes.FLOAT,
      defaultValue: 0, validate: {
        min: 0,  // Minimum value
        max: 5 // Maximum value
      } },
    thematique: { type: DataTypes.STRING },
    datedebut: { type: DataTypes.DATE },
    datefin: { type: DataTypes.DATE },
    verouillee: { type: DataTypes.BOOLEAN, defaultValue: false },
    typeFlag: { type: DataTypes.ENUM('facultat', 'obligatoire'), allowNull: false, },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'id' } }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'Formations',
  });

  // Associations
  Formation.associate = (models) => {
    Formation.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Formation.hasOne(models.FormationDetails, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Video, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Evaluation, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.NoteDigitale, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Document, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Quiz, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    Formation.hasMany(models.Certification, { foreignKey: 'formationId', onDelete: 'CASCADE' }); // Added the reverse association
  };

  return Formation;
};
