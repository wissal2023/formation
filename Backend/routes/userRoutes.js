const express = require('express');
const router = express.Router();
const { addUserController, loginUserController, getAllUsers, getOnceUser } = require('../Controllers/userController'); // On utilise maintenant userController pour tout

// Route pour l'enregistrement d'un utilisateur (avec Supabase)
router.post('/register', addUserController);

// Route pour la connexion d'un utilisateur (avec envoi OTP)
router.post('/login', loginUserController);

// Route pour récupérer tous les utilisateurs
router.get('/getAll', getAllUsers);

// Route pour récupérer un seul utilisateur par ID
router.get('/getOnce/:id', getOnceUser);

module.exports = router;