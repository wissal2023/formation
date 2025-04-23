const express = require('express');
const router = express.Router();
const quizProgController = require('../controllers/quizProgController');

router.post('/quiz-prog', quizProgController.createQuizProgress);
router.put('/quiz-prog', quizProgController.updateQuizProgress);
router.get('/quiz-prog/:userId/:quizId', quizProgController.getQuizProgressForUser);
router.get('/quiz-prog/:userId', quizProgController.getAllQuizProgressForUser);
router.get('/quiz-prog/:quizId', quizProgController.getAllProgressForQuiz);


module.exports = router;
