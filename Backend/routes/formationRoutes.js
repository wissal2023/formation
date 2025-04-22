// routes/formation.routes.js
const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formationController');
const authenticateToken = require('../utils/authMiddleware');
router.post('/AddFormation',authenticateToken, formationController.createFormation);
router.get('/all', authenticateToken, formationController.getAllFormations);
router.get('/:id', authenticateToken, formationController.getFormationById);

router.put('/:id', formationController.updateFormation);
router.delete('/:id', formationController.deleteFormation);

module.exports = router;
