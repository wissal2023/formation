// routes/recompenseRoutes.js
const express = require('express');
const router = express.Router();
const recompenseController = require('../controllers/recompenseController');


router.post('/', recompenseController.createRecompense);
router.get('/', recompenseController.getAllRecompenses);
router.get('/:id', recompenseController.getRecompenseById);
router.put('/:id', recompenseController.updateRecompense);
router.delete('/:id', recompenseController.deleteRecompense);

module.exports = router;
