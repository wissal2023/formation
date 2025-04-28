module.exports = (sequelize, DataTypes) => {
  const Otp = sequelize.define('Otp', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secret: {
      type: DataTypes.STRING,  // Add secret to store the OTP secret (base32)
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,  // Add verified flag to track OTP verification status
      defaultValue: false,  // Default to false when a new OTP is created
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Otps',
    timestamps: false,  // If you don't want Sequelize to automatically manage createdAt and updatedAt columns
  });

  return Otp;
};
