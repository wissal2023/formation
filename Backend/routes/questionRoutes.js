const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');


router.delete('/questions/:questionId', questionController.deleteQuestion);
router.post('/quizzes/:quizId/questions', questionController.addQuestionToQuiz);  
router.get('/quizzes/:quizId/questions', questionController.getAllQuestionsForQuiz);

module.exports = router;
