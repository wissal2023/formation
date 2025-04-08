// routes/formation.routes.js
const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formationController');

router.post('/AddFormation', formationController.createFormation);
router.get('/', formationController.getAllFormations);
router.get('/:id', formationController.getFormationById);
router.put('/:id', formationController.updateFormation);
router.delete('/:id', formationController.deleteFormation);

module.exports = router;
