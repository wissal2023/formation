const express = require('express');
const router = express.Router();
const formationDetailsController = require('../controllers/formationDetailsController');

router.post('/', formationDetailsController.createFormationDetails);
router.get('/', formationDetailsController.getAllFormationDetails);
router.get('/:id', formationDetailsController.getFormationDetailsById);
router.put('/:id', formationDetailsController.updateFormationDetails);
router.delete('/:id', formationDetailsController.deleteFormationDetails);

module.exports = router;
