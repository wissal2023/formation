// routes/helpTranslationRoutes.js

const express = require('express');
const router = express.Router();
const helpTranslationController = require('../controllers/helpTranslationController');

router.post('/', helpTranslationController.createTranslation);
router.get('/:id', helpTranslationController.getTranslationById);
router.put('/:id', helpTranslationController.updateTranslation);
router.delete('/:id', helpTranslationController.deleteTranslation);

module.exports = router;
