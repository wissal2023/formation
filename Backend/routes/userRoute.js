// routes/userRoute.js
const express = require('express');
const router = express.Router();
const { addUserController, loginUserController, getAllUsers, getOnceUser } = require('../controllers/usercontroller'); // On utilise maintenant userController pour tout
const verifyToken = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/models');
const User = db.User;
// Route pour l'enregistrement d'un utilisateur (avec Supabase)
router.post('/register', addUserController);

// Route pour la connexion d'un utilisateur (avec envoi OTP)
//router.post('/login', loginUserController);
router.post('/login', async (req, res) => {
  const { email, mdp } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé ❌' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(mdp, user.mdp);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect ❌' });
    }

    // Créer un token JWT personnalisé
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.roleUtilisateur
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '2h' }
    );

    // Répondre avec les infos utiles
    res.status(200).json({
      message: 'Connexion réussie ✅',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.roleUtilisateur
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur serveur 😥',
      error: error.message
    });
  }
});

// Route pour récupérer tous les utilisateurs
router.get('/getAll', getAllUsers); // update to get user from BD

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