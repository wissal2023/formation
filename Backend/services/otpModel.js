// services/otpModels.js
const bcrypt = require('bcrypt');
const { Otp } = require('../db/models');

const isValidOtp = async (email, providedOtp) => {
  const otpEntry = await Otp.findOne({ where: { email } });
  if (!otpEntry) return false;

  const otpValid = await bcrypt.compare(providedOtp.toString(), otpEntry.otp);
  console.log("OTP Match:", otpValid);

  const createdAt = new Date(otpEntry.created_at);
  const isExpired = new Date() - createdAt > 10 * 60 * 1000;
  
  console.log('OTP created at:', createdAt);
  console.log('Now:', new Date());
  console.log('Is OTP expired:', isExpired);
  console.log("Stored OTP (hashed):", otpEntry.otp);
  console.log("Provided OTP (plaintext):", providedOtp);
  console.log("Secret:", otpEntry.secret);
  console.log("created_at (DB):", createdAt.toISOString());
  console.log("current (now):", new Date().toISOString());

  //return otpValid && !isExpired;
  return otpValid;

};

const deleteOtp = async (email) => {
  console.log("Deleting OTP for email:", email); // Log when OTP is deleted
  await Otp.destroy({ where: { email } });
};

const saveSecretForUser = async (email, secret) => {
  try {
    const otpEntry = await Otp.findOne({ where: { email } });
    if (otpEntry) {
      otpEntry.secret = secret;  // Use the generated secret here
      await otpEntry.save();
    } else {
      // Save the new OTP entry with the generated secret
      await Otp.create({
        email: email,
        secret: secret,  // Use the generated secret here
        otp: '', // Empty OTP value for now, this will be updated later
        verified: false,
      });
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du secret:', error);
    throw error;
  }
};


module.exports = {
  isValidOtp,
  deleteOtp,
  saveSecretForUser,
};