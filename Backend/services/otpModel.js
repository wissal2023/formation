// services/otpModels.js
const bcrypt = require('bcrypt');
const { Otp } = require('../db/models'); // ton modèle Sequelize

exports.isValidOtp = async (email, providedOtp) => {
  const otpEntry = await Otp.findOne({ where: { email } });

  console.log('Fetched OTP entry:', otpEntry); // Log the fetched OTP entry

  if (!otpEntry) return false;

  const otpValid = await bcrypt.compare(providedOtp.toString(), otpEntry.otp);
  const createdAt = new Date(otpEntry.createdAt);
  const isExpired = new Date() - createdAt > 10 * 60 * 1000;

  console.log('OTP Valid:', otpValid);  // Log whether OTP is valid
  console.log('Is OTP expired:', isExpired); // Log whether OTP is expired

  return otpValid && !isExpired;
};


exports.deleteOtp = async (email) => {
  console.log("Deleting OTP for email:", email); // Log when OTP is deleted
  await Otp.destroy({ where: { email } });
};