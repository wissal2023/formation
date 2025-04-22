const express = require('express');
const router = express.Router();
const noteDigitaleController = require('../controllers/noteDigitaleController');

router.post('/', noteDigitaleController.create);
router.get('/', noteDigitaleController.findAll);
router.get('/:id', noteDigitaleController.findOne);
router.put('/:id', noteDigitaleController.update);
router.delete('/:id', noteDigitaleController.delete);

module.exports = router;
