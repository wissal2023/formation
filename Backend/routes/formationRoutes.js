// routes/formation.routes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const { createFormation, getAllFormations, getFormationById, 
        updateFormation, deleteFormation, getCompletedFormations} = require('../controllers/formationController'); 

router.post('/AddFormation',authenticateToken, createFormation);
router.get('/completed', authenticateToken, getCompletedFormations);
router.get('/all', authenticateToken, getAllFormations);
router.get('/:id', authenticateToken, getFormationById);
router.put('/:id', updateFormation);
router.delete('/:id', deleteFormation);






module.exports = router;
