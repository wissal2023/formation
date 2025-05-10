const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const {
  createFormationDetails,
  getDescriptionByFormationId,
  getPlanByFormationId
} = require('../controllers/formationDetailsController'); 

router.post('/addDetail', authenticateToken, createFormationDetails);

router.get('/:formationId/description', authenticateToken, getDescriptionByFormationId);

router.get('/:formationId/plan', authenticateToken, getPlanByFormationId);

module.exports = router;
