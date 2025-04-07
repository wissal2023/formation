const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByName
} = require('../controllers/usercontroller');

// CRUD Routes
router.get('/', getUsers);            // GET all users
router.get('/:id', getUserByName);      // GET user by ID
router.post('/', createUser);         // POST new user
router.put('/:id', updateUser);       // PUT update user
router.delete('/:id', deleteUser);    // DELETE user

module.exports = router;
