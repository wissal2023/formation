const { Question, Reponse, Historisation, Trace,Quiz,User } = require('../db/models');

exports.deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  const transaction = await sequelize.transaction();  

  try {
    const question = await Question.findByPk(questionId, {
      include: [Reponse]
    });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    const deletedData = {
      question: question.toJSON(),
      reponses: question.Reponses.map(r => r.toJSON())
    };

    await Historisation.create({
      action: 'deleted',
      deleted_data: deletedData,
      questionId: question.id,
      userId: req.user.id  
    }, { transaction });

    await question.destroy({ transaction });

    await Trace.create({
      userId: req.user.id,
      action: 'deleted',
      model: 'Question',
      data: {
        questionId: question.id,
        deletedData: deletedData,
      },
    }, { transaction });

    await transaction.commit(); 

    res.status(200).json({ message: 'Question and related answers archived and deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Error deleting question', error });
  }
};


exports.addQuestionToQuiz = async (req, res) => {
  const { quizId } = req.params; 
  const { userId, questionData } = req.body; 

  const transaction = await sequelize.transaction(); 

  try {
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    if (user.roleUtilisateur !== 'Formateur' && user.roleUtilisateur !== 'Admin') {
      return res.status(403).json({ message: 'Permission denied.' });
    }

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    const question = await Question.create({
      quizId: quiz.id, 
      questionText: questionData.questionText, 
    }, { transaction });
    let reponseIds = [];
    if (questionData.reponses) {
      for (let reponseData of questionData.reponses) {
        const reponse = await Reponse.create({
          reponseText: reponseData.reponseText, 
          isCorrect: reponseData.isCorrect, 
          questId: question.id  
        }, { transaction });

        reponseIds.push(reponse.id);  
      }
    }
    await Trace.create({
      userId,
      action: 'add_question_to_quiz',
      model: 'Quiz',
      data: {
        quizId: quiz.id,
        questionId: question.id,
        reponseIds  
      },
    }, { transaction });

    await transaction.commit(); 

    return res.status(201).json({
      message: 'Question and its reponses added to the quiz successfully.',
      question,
      reponses: reponseIds,
    });
  } catch (error) {
    await transaction.rollback();  
    console.error('Error adding question to quiz:', error);
    return res.status(500).json({ message: 'Error adding question to quiz', error });
  }
};


exports.getAllQuestionsForQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;  
    const quiz = await Quiz.findByPk(quizId, {
      include: [
        { model: Question, include: [Reponse] }  
      ]
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    return res.status(200).json({ message: 'Questions for quiz fetched successfully', quiz });
  } catch (error) {
    console.error('Error fetching questions for quiz:', error);
    return res.status(500).json({ message: 'Error fetching questions for quiz', error });
  }
};
