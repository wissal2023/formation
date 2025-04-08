const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller'); // change le chemin selon ton projet

router.get('/', userController.getAllUsers);
router.get('/:name', userController.getUserByName);
router.post('/addUser', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;