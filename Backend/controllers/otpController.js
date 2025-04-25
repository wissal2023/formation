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

// *************************************** cheked method 


// Générer un secret pour Google Authenticator
const generateSecret = async (req, res) => {
  const { email } = req.body;
  console.log("📥 Requête reçue avec email :", email);
  console.log("Email reçu côté backend :", req.body.email);

  if (!email) {
    return res.status(400).json({ message: "Email manquant dans la requête." });
  }

  const secret = speakeasy.generateSecret({ length: 20 });
  console.log("🔐 Secret généré :", secret);

  try {
    // Vérifie si un secret existe déjà pour cet email
    const existingOtp = await Otp.findOne({ where: { email } });
    console.log("🔎 Vérification email dans DB :", existingOtp);

    if (!existingOtp) {
      await Otp.create({
        email,
        secret: secret.base32,
        verified: false,
      });
      console.log(" Secret enregistré en DB");
    }

    // Générer l'URL OTP pour Google Authenticator
    const otpAuthUrl = speakeasy.otpauthURL({
      secret: secret.base32,
      label: email,
      issuer: 'TeamwillApp',
      encoding: 'base32',
    });

    console.log("🌐 URL pour QR Code :", otpAuthUrl);

     // Générer le QR Code
     qrcode.toDataURL(otpAuthUrl, (err, data_url) => {
      if (err) {
        console.error("❌ Erreur QR Code :", err);
        return res.status(500).json({ message: "Erreur lors de la génération du QR Code." });
      }

      console.log("🖼️ QR Code généré !");
      res.status(200).json({
        message: 'QR Code généré avec succès.',
        secret: secret.base32,
        qrCodeUrl: data_url,
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la génération du secret.', error: error.message });
  }
};

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
