const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formationController');

// Route to delete a Formation (along with related data)
router.delete('/:id', formationController.deleteFormation);

module.exports = router;
