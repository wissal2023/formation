// backend/routes/userRoute.js
const express = require('express');
const router = express.Router();
const {User} = require("../db/models");
const upload = require('../utils/multerConfig'); // Adjust path if needed
const authenticateToken = require('../utils/authMiddleware');
const { addUserController, loginUserController, logoutUserController, 
        updatePasswordController, getAllUsers, getOnceUser, getUserByName,
        updateUserController, updateProfileController, getUserByIdController } = require('../controllers/userController'); // On utilise maintenant userController pour tout
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const db = require('../db/models');
//const verifyToken = require('../middleware/auth');


// ************************************* A vérifier
/*
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
*/

router.get('/login', authenticateToken, (req, res) => {
  res.json({ message: 'Bienvenue sur le dashboard admin', user: req.user });
});
router.post('/login', loginUserController);
router.post("/change-password", authenticateToken, updatePasswordController);
router.post('/register', authenticateToken, addUserController);
router.post('/logout', authenticateToken,logoutUserController);
router.get('/getOnce', authenticateToken, getOnceUser);
router.put('/edit/:id', authenticateToken, upload.single('photo'), updateUserController);
router.get('/getAll', authenticateToken, getAllUsers);
router.get('/getById/:id', authenticateToken, getUserByIdController);
router.put('/profile/:id', authenticateToken, updateProfileController);

router.get('/:name', getUserByName);

module.exports = router;