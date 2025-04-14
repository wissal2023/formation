// routes/userRoute.js
const express = require('express');
const router = express.Router();
const { addUserController, loginUserController, getAllUsers, getOnceUser } = require('../controllers/userController'); // On utilise maintenant userController pour tout

// Route pour l'enregistrement d'un utilisateur (avec Supabase)
router.post('/register', addUserController);

// Route pour la connexion d'un utilisateur (avec envoi OTP)
router.post('/login', loginUserController);

// Route pour récupérer tous les utilisateurs
router.get('/getAll', getAllUsers);

// Route pour récupérer un seul utilisateur par ID
router.get('/getOnce/:id', getOnceUser);

module.exports = router;

/** user of wissal & siwar
 * const userController = require('../controllers/userController'); // change le chemin selon ton projet
 
 router.get('/', userController.getAllUsers);
 router.get('/:name', userController.getUserByName);
 router.post('/addUser', userController.createUser);
 router.put('/:id', userController.updateUser);
 router.delete('/:id', userController.deleteUser);
 
 module.exports = router;
 */