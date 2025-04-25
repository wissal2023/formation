// backend/controllers/otpController
const otpModel = require('../services/otpModel'); 
const speakeasy = require('speakeasy'); 
const qrcode = require('qrcode'); 
const { generateOtp } = require('../services/otpService');
const { sendOtpEmail } = require('../utils/emailService');
const { Otp } = require('../db/models');
const bcrypt = require('bcrypt'); // <-- à ajouter en haut si pas déjà fait

//router.post('/generate-otp', sendOtp);
const sendOtp = async (req, res) => {
  const { email } = req.body;
  console.log('Email reçu depuis req.body:', email);

  if (!email) {
    return res.status(400).json({ message: 'Email requis.' });
  }
  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp.toString(), 10); 
  console.log("OTP generated at:", new Date());

  try {
    await sendOtpEmail(email, otp);
    
    await Otp.create({
      email,
      otp:hashedOtp, 
      secret: 'secret-temp'// to change later 
    });
    
    res.status(200).json({ message: 'OTP envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi ou du stockage de l\'OTP:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};
//router.post('/verifyOtp', verifyOtp);
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log("Received OTP request with email:", email);
  console.log("Received OTP:", otp);


  try {
    // Vérifier si l'OTP est valide
    const isValid = await otpModel.isValidOtp(email, otp);
    console.log(typeof otp)

    if (!isValid) {
      console.log("OTP invalid or expired for email:", email);
      return res.status(400).json({ message: 'OTP invalide ou expiré.' });
    }
    // Supprimer l'OTP après vérification
    await otpModel.deleteOtp(email);
    return res.status(200).json({ message: 'OTP vérifié avec succès.' });
  
  } catch (error) {
      console.error("Error verifying OTP:", error); 
      res.status(500).json({ 
        message: "Erreur lors de la vérification de l'OTP.", 
        error: error.message,
        stack: error.stack // Pour un débogage plus riche (à retirer en prod)
      });
    }
    
};
//router.get('/generate-secret', authenticateToken, generateSecret);  
const generateSecret = async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    const secret = speakeasy.generateSecret({ length: 20 });
    const otpAuthUrl = speakeasy.otpauthURL({
      secret: secret.base32,
      label: email,
      issuer: 'Teamwill',
    });

    const qrCodeUrl = await qrcode.toDataURL(otpAuthUrl);

    // Sauvegarde dans DB si nécessaire (associer à l'utilisateur)
    await otpModel.saveSecretForUser(email, secret.base32);

    res.json({ qrCodeUrl });
  } catch (error) {
    console.error("Erreur lors de la génération du QR code:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// *************************************** cheked method 



// Vérifier l'OTP généré par Google Authenticator
const verifyGoogleOtp = async (req, res) => {
  const { email, token } = req.body;

  try {
    const result = await pool.query('SELECT secret FROM google_otp WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const secret = result.rows[0].secret;

    const isVerified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 1,
    });

    if (isVerified) {
      // Marquer comme vérifié
      await pool.query(`UPDATE google_otp SET verified = true WHERE email = $1`, [email]);

      res.status(200).json({ message: 'OTP vérifié avec succès ! 🎉' });
    } else {
      res.status(400).json({ message: 'OTP invalide !' });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la vérification.", error: error.message });
  }
};


const getOtpStatus = async (req, res) => {
  const { email } = req.query;
  console.log("GET /otp/status called with email:", email); // 🔍

  try {
    const result = await pool.query('SELECT verified FROM google_otp WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ verified: false, message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ verified: result.rows[0].verified });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du statut.", error: error.message });
  }
};

// Exporter les fonctions
module.exports = { 
  verifyOtp, 
  generateSecret, 
  verifyGoogleOtp, 
  getOtpStatus,
  sendOtp 
};
