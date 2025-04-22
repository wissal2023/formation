const db = require('../db/models');
const Question = db.Question;

// CREATE a new question
exports.createQuestion = async (req, res) => {
  try {
    const { questionText, quizId } = req.body;
    const question = await Question.create({ questionText, quizId });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE question
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionText, quizId } = req.body;
    const question = await Question.findByPk(id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    await question.update({ questionText, quizId });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE question (soft delete)
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    await question.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
