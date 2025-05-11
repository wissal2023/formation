// backend/routes/userRoute.js
const express = require('express');
const router = express.Router();
const {User} = require("../db/models");
const {uploadImage} = require('../utils/multerConfig'); 
const authenticateToken = require('../utils/authMiddleware');
const { 
    addUserController, 
    loginUserController, 
    logoutUserController, 
    updatePasswordController, 
    getAllUsers, 
    getOnceUser, 
    getUserByName,
    updateUserController, 
    updateProfileController, 
    getUserByIdController,
    getAuthenticatedUser,
    deleteUser // Assurez-vous que deleteUser est importé ici
} = require('../controllers/usercontroller'); 

// Routes d'authentification
router.get('/auth', getAuthenticatedUser);
router.post('/login', loginUserController);
router.post('/logout', authenticateToken, logoutUserController);

// Routes de gestion des utilisateurs
router.post('/register', authenticateToken, addUserController);
router.post('/change-password', authenticateToken, updatePasswordController);
router.get('/getOnce', authenticateToken, getOnceUser);
router.put('/edit/:id', authenticateToken, uploadImage.single('photo'), updateUserController);
router.get('/getAll', authenticateToken, getAllUsers);
router.get('/getById/:id', authenticateToken, getUserByIdController);
router.put('/profile/:id', authenticateToken, updateProfileController);

// Route pour supprimer un utilisateur (avec authentification par token)
router.delete('/delete/:id', authenticateToken, deleteUser);

// Autres routes
router.get('/:name', getUserByName);
router.get('/login', (req, res) => {
  res.json({ message: 'Bienvenue sur le dashboard admin', user: req.user });
});

module.exports = router;