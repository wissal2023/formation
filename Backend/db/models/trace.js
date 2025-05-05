'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trace = sequelize.define('Trace', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {  // Action type ('create', 'update', 'archive')
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {    // the page route in the front
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.JSONB, 
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
        type: DataTypes.DATE
      }
  }, {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'Traces', 
  });

  // Association: A Trace belongs to a User (the actor performing the action)
  Trace.associate = (models) => {
    Trace.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return Trace;
};
