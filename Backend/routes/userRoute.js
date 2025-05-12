// backend/routes/userRoute.js
const express = require('express');
const router = express.Router();
const { User } = require("../db/models");
const { uploadImage } = require('../utils/multerConfig');  // Importation de uploadImage
const authenticateToken = require('../utils/authMiddleware');
const { addUserController, loginUserController, logoutUserController, 
        updatePasswordController, getAllUsers, getOnceUser, getUserByName,
        updateUserController, updateProfileController, getUserByIdController,
<<<<<<< HEAD
        getAuthenticatedUser, 
        getUser,
        updateUserProfileController} = require('../controllers/usercontroller'); // On utilise maintenant userController pour tout
=======
        getAuthenticatedUser,forgotPasswordController, modifyPasswordController } = require('../controllers/usercontroller'); // On utilise maintenant userController pour tout
>>>>>>> ff98b09c543b0841982ac6c6453ff4b7b82e3c6e
router.get('/auth', getAuthenticatedUser);
router.post('/login', loginUserController);
router.post("/change-password", authenticateToken, updatePasswordController);
router.post('/forgot-password', forgotPasswordController);
router.post('/update-password', modifyPasswordController);
router.post('/register', authenticateToken, addUserController);
router.post('/change-password', authenticateToken, updatePasswordController);
router.get('/getOnce', authenticateToken, getOnceUser);
router.put('/edit/:id', authenticateToken, uploadImage.single('photo'), updateUserController);
router.get('/getAll', authenticateToken, getAllUsers);
router.get('/getById/:id', authenticateToken, getUserByIdController);

<<<<<<< HEAD
router.get('/getUser/:id', authenticateToken, getUser );
router.put('/profile/:id', authenticateToken, updateProfileController);
router.put('/UpdateUser/:id', uploadImage.single("photo"), authenticateToken, updateUserProfileController);

=======
// Route pour supprimer un utilisateur (avec authentification par token)
router.delete('/delete/:id', authenticateToken, deleteUser);

// Autres routes
router.put('/profile/:id', authenticateToken,uploadImage.single('photo'), updateProfileController);
>>>>>>> ff98b09c543b0841982ac6c6453ff4b7b82e3c6e
router.get('/:name', getUserByName);
router.get('/login', (req, res) => {
  res.json({ message: 'Bienvenue sur le dashboard admin', user: req.user });
});

module.exports = router;