const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formationController');


router.get('/', formationDetailsController.getAllFormationDetails);
router.get('/:id', formationDetailsController.getFormationDetailsById);
router.put('/:id', formationDetailsController.updateFormationDetails);
//router.delete('/:id', formationController.deleteFormation);

module.exports = router;
