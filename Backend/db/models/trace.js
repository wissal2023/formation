'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trace = sequelize.define('Trace', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    action: {  // Action type (e.g., 'create', 'update', 'delete')
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {  // Model name (e.g., 'Formation', 'FormationDetails')
      type: DataTypes.STRING,
      allowNull: false
    },
    recordId: {  // The ID of the affected record
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data: {  // Store the data that was affected (can be JSON)
      type: DataTypes.JSONB,  // Storing as JSONB for flexibility
      allowNull: true
    },
    userId: {  // User who performed the action
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    }
  }, {
    timestamps: false,  // Disable auto timestamps as we handle it manually
    freezeTableName: true,
    tableName: 'Traces'  // Change the table name to 'Traces'
  });

  // Association: A Trace belongs to a User (the actor performing the action)
  Trace.associate = (models) => {
    Trace.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return Trace;
};
