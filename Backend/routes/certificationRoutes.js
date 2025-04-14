const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certificationController');

router.post('/', certificationController.createCertification);
router.get('/', certificationController.getAllCertifications);
router.get('/:id', certificationController.getCertificationById);
router.put('/:id', certificationController.updateCertification);
router.delete('/:id', certificationController.deleteCertification);

module.exports = router;
