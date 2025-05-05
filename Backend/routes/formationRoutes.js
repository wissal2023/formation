// routes/formation.routes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const { createFormation, getAllFormations, getFormationById, 
        updateFormation, deleteFormation} = require('../controllers/formationController'); 

router.post('/AddFormation',authenticateToken, createFormation);
router.get('/all', authenticateToken, getAllFormations);
router.get('/:id', authenticateToken, getFormationById);
router.put('/:id', updateFormation);
router.delete('/:id', deleteFormation);


router.get('/completed', authenticateToken, formationController.getCompletedFormations);




module.exports = router;
