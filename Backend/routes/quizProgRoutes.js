const express = require('express');
const router = express.Router();
const quizProgController = require('../controllers/quizProgController');

router.post('/', quizProgController.create);
router.get('/', quizProgController.getAll);
router.get('/:id', quizProgController.getById);
router.put('/:id', quizProgController.update);
router.delete('/:id', quizProgController.remove);

module.exports = router;
