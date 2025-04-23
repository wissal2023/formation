const { QuizProg, Quiz, User, Trace } = require('../db/models');

exports.createQuizProgress = async (req, res) => {
  const { userId, quizId } = req.body;
  try {
    const quizProg = await QuizProg.create({
      userId,
      quizId,
      completed: false,
      pointGagne: 0,
    });
    return res.status(201).json({ message: 'Quiz progress created successfully', quizProg });
  } catch (error) {
    console.error('Error creating quiz progress:', error);
    return res.status(500).json({ message: 'Error creating quiz progress', error });
  }
};

exports.updateQuizProgress = async (req, res) => {
  const { userId, quizId, completed, pointGagne } = req.body;
  try {
    const quizProg = await QuizProg.findOne({ where: { userId, quizId } });
    if (!quizProg) {
      return res.status(404).json({ message: 'Quiz progress not found' });
    }
    quizProg.completed = completed;
    quizProg.completedAt = completed ? new Date() : null;
    quizProg.pointGagne = pointGagne;
    await quizProg.save();
    return res.status(200).json({ message: 'Quiz progress updated successfully', quizProg });
  } catch (error) {
    console.error('Error updating quiz progress:', error);
    return res.status(500).json({ message: 'Error updating quiz progress', error });
  }
};

exports.getQuizProgressForUser = async (req, res) => {
  const { userId, quizId } = req.params;
  try {
    const quizProg = await QuizProg.findOne({
      where: { userId, quizId },
      include: [{ model: Quiz }]
    });
    if (!quizProg) {
      return res.status(404).json({ message: 'Quiz progress not found' });
    }
    return res.status(200).json({ message: 'Quiz progress fetched successfully', quizProg });
  } catch (error) {
    console.error('Error fetching quiz progress:', error);
    return res.status(500).json({ message: 'Error fetching quiz progress', error });
  }
};

exports.getAllQuizProgressForUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const quizProgs = await QuizProg.findAll({
      where: { userId },
      include: [{ model: Quiz }]
    });
    if (quizProgs.length === 0) {
      return res.status(404).json({ message: 'No quiz progress found for this user' });
    }
    return res.status(200).json({ message: 'All quiz progress fetched successfully', quizProgs });
  } catch (error) {
    console.error('Error fetching all quiz progress for user:', error);
    return res.status(500).json({ message: 'Error fetching all quiz progress for user', error });
  }
};

exports.getAllProgressForQuiz = async (req, res) => {
  const quizId = req.params.quizId;
  try {
    const quizProgs = await QuizProg.findAll({
      where: { quizId },
      include: [{ model: User }]
    });
    if (quizProgs.length === 0) {
      return res.status(404).json({ message: 'No quiz progress found for this quiz' });
    }
    return res.status(200).json({ message: 'All quiz progress fetched successfully', quizProgs });
  } catch (error) {
    console.error('Error fetching all quiz progress for quiz:', error);
    return res.status(500).json({ message: 'Error fetching all quiz progress for quiz', error });
  }
};
