const { Quiz, Trace, User, Question, Reponse, QuizProg, FormationDetails,Historisation } = require('../db/models');
const { calculateScore } = require('../services/quizService');
const sequelize = require('../db/models').sequelize; // Add this to access transactions


//app.use('/quizzes', quizRoutes);
//router.post('/create', quizController.createQuiz);
exports.createQuiz = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { formationDetailsId, questions, difficulty, tentatives } = req.body;

    const user = await User.findByPk(userId);
    if (!user || (user.roleUtilisateur !== 'Formateur' && user.roleUtilisateur !== 'Admin')) {
      await transaction.rollback();
      return res.status(403).json({ message: 'Permission refusée ou utilisateur introuvable.' });
    }

    const formation = await FormationDetails.findByPk(formationDetailsId);
    if (!formation) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Formation non trouvée.' });
    }

    const [quiz, created] = await Quiz.findOrCreate({
      where: { formationDetailsId },
      defaults: {
        difficulty: difficulty || 'medium',
        tentatives: tentatives || 0,
        totalScore: 0,
        score: 0
      },
      transaction
    });

    let questionIds = [];

    for (const q of questions) {
      const createdQuestion = await Question.create({
        questionText: q.questionText,
        optionType: q.optionType || 'Multiple_choice',
        quizId: quiz.id
      }, { transaction });

      questionIds.push(createdQuestion.id);

      if (q.optionType === 'Multiple_choice' || q.optionType === 'single_choice') {
        if (Array.isArray(q.reponses)) {
          for (const rep of q.reponses) {
            await Reponse.create({
              questionId: createdQuestion.id,
              reponseText: rep.reponseText,
              isCorrect: rep.isCorrect,
              points: rep.points || 1
            }, { transaction });
          }
        }
      } else if (q.optionType === 'Match') {
        // Handle Match type question: Store each pair as Reponses
        if (Array.isArray(q.matchPairs)) {
          let pairIndex = 1;
          for (const pair of q.matchPairs) {
            await Reponse.create({
              questionId: createdQuestion.id,
              reponseText: pair.left,
              isCorrect: true,  // Or handle correctness separately
              points: pairIndex, // Use points to indicate position or correctness
              pairIndex, // You can add a `pairIndex` field if you want to separate pairs
            }, { transaction });
            await Reponse.create({
              questionId: createdQuestion.id,
              reponseText: pair.right,
              isCorrect: true,  // Or handle correctness separately
              points: pairIndex,
              pairIndex,
            }, { transaction });
            pairIndex++;
          }
        }
      } else if (q.optionType === 'Reorganize') {
        // Handle Reorganize type question: Store items in Reponses with their order
        if (Array.isArray(q.reorganizeItems)) {
          for (let i = 0; i < q.reorganizeItems.length; i++) {
            await Reponse.create({
              questionId: createdQuestion.id,
              reponseText: q.reorganizeItems[i],
              isCorrect: false, // We might not need this, adjust based on your logic
              points: i + 1  // Store the order in points (or any other field)
            }, { transaction });
          }
        }
      }
    }
    await Trace.create({
      userId,
      model: 'Quiz',
      action: 'Création de quiz',
      data: {
        quizId: quiz.id,
        formationDetailsId,
        questionIds,
        difficulty: quiz.difficulty,
        tentatives: quiz.tentatives
      }
    }, { transaction });

    await transaction.commit();
    return res.status(201).json({ message: 'Quiz créé avec succès.', quizId: quiz.id });

  } catch (error) {
  
  console.error("Error details:", error.response ? error.response.data : error.message);
}
};


/*
exports.createQuiz = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId, formationId, quizData } = req.body;

    // Validate user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Check if the user has the required role
    if (user.roleUtilisateur !== 'Formateur' && user.roleUtilisateur !== 'Admin') {
      return res.status(403).json({ message: 'Permission refusée.' });
    }

    // Validate formation
    const formation = await Formation.findByPk(formationId);
    if (!formation) {
      return res.status(404).json({ message: 'Formation non trouvée.' });
    }

    // Create the quiz
    const quiz = await Quiz.create({
      formationId,
      difficulty: quizData.difficulty,
      totalScore: quizData.totalScore,
      userId,
    }, { transaction });

    let questionIds = [];
    for (let questionData of quizData.questions) {
      // Create questions for the quiz
      const question = await Question.create({
        quizId: quiz.id,
        questionText: questionData.questionText,
        multipleChoice: questionData.multipleChoice, // Handle multiple choice questions
      }, { transaction });

      questionIds.push(question.id);

      // Create answers for each question
      if (questionData.reponses) {
        for (let reponseData of questionData.reponses) {
          await Reponse.create({
            reponseText: reponseData.reponseText,
            isCorrect: reponseData.isCorrect,
            questId: question.id,
          }, { transaction });
        }
      }
    }

    // Log the creation action in Trace
    await Trace.create({
      userId,
      page: 'Quiz',
      action: 'Création de quiz',
      metadata: {
        quizId: quiz.id,
        formationId,
        questionIds,
      }
    }, { transaction });

    // Commit the transaction if everything goes well
    await transaction.commit();

    // Send success response
    return res.status(201).json({
      message: 'Quiz créé avec succès.',
      quiz,
      questions: questionIds,
    });
  } catch (error) {
    // Rollback transaction if error occurs
    await transaction.rollback();

    // Log the error and send failure response
    console.error('Erreur lors de la création du quiz:', error);
    return res.status(500).json({ message: 'Erreur lors de la création du quiz', error: error.message });
  }
};
*/
exports.getQuizByFormation = async (req, res) => {
  try {
    const { formationId } = req.params;
    console.log('➡️ formationId from params:', formationId);

    // 1. Get formation details
    const formationDetails = await FormationDetails.findOne({
      where: { formationId },
    });

    if (!formationDetails) {
      return res.status(404).json({ message: 'Détails de formation non trouvés.' });
    }

    const formationDetailsId = formationDetails.id;

    // 2. Get the quiz including questions and answers
    const quiz = await Quiz.findOne({
      where: { formationDetailsId },
      include: [
        {
          model: Question,
          as: 'Questions',
          include: [
            {
              model: Reponse,
              as: 'Reponses',
            },
          ],
        },
      ],
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz non trouvé pour cette formation.' });
    }

    // 3. Extract only the questions and answers
    const questionsWithAnswers = quiz.Questions.map((questionInstance) => {
      const question = questionInstance.get({ plain: true });
      return {
        id: question.id,
        questionText: question.questionText,
        optionType: question.optionType, // optional: remove if not needed
        reponses: question.Reponses.map((reponse) => ({
          id: reponse.id,
          reponseText: reponse.reponseText,
          // Include these if needed:
          // isCorrect: reponse.isCorrect,
          // points: reponse.points
        })),
      };
    });

    return res.status(200).json({ questions: questionsWithAnswers });

  } catch (error) {
    console.error('❌ Erreur récupération quiz:', error);
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.attemptQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const { userAnswers } = req.body; // User answers mapped by question ID
    const userId = req.user.id;

    // Fetch quiz along with its questions and answers
    const quiz = await Quiz.findByPk(quizId, {
      include: [
        {
          model: Question,
          include: [Reponse], // Include answers for each question
        },
      ],
    });

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    const totalQuestions = quiz.Questions.length;
    const scorePerQuestion = 100 / totalQuestions; // Calculate score per question

    let totalScore = 0;
    let correctAnswers = 0;

    for (let i = 0; i < quiz.Questions.length; i++) {
      const question = quiz.Questions[i];

      // Get the correct answers for this question
      const correctReponses = await Reponse.findAll({
        where: { questionId: question.id, isCorrect: true },
      });

      // User's answers for the current question
      const userSelectedAnswers = userAnswers[question.id] || [];

      // Check if the user's answers match the correct answers
      const isCorrect = userSelectedAnswers.every((answerId) => {
        return correctReponses.some((reponse) => reponse.id === answerId);
      }) && userSelectedAnswers.length === correctReponses.length;

      if (isCorrect) {
        correctAnswers++;
        totalScore += scorePerQuestion; // Award full score for the correct question
      } else {
        // If any answer is wrong, the whole question is considered incorrect
        totalScore += 0; // No points awarded
      }
    }

    // Save the progress of the quiz attempt
    const quizProg = await QuizProg.findOne({ where: { userId, quizId } });

    if (!quizProg) {
      await QuizProg.create({
        userId,
        quizId,
        completed: correctAnswers === quiz.Questions.length, // Check if all questions are answered correctly
        completedAt: correctAnswers === quiz.Questions.length ? new Date() : null,
        pointGagne: totalScore,
      });
    } else {
      quizProg.completed = correctAnswers === quiz.Questions.length;
      quizProg.completedAt = correctAnswers === quiz.Questions.length ? new Date() : null;
      quizProg.pointGagne = totalScore;
      await quizProg.save();
    }

    return res.status(200).json({
      success: true,
      message: correctAnswers === quiz.Questions.length ? 'You passed the quiz!' : 'You failed the quiz, try again!',
      totalScore,
      correctAnswers,
    });
  } catch (error) {
    console.error('Error during quiz attempt:', error);
    return res.status(500).json({ success: false, message: 'Error while attempting the quiz', error });
  }
};
exports.updateQuiz = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.body.userId;
    const { quizId, quizData } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    if (user.roleUtilisateur !== 'Formateur' && user.roleUtilisateur !== 'Admin') {
      return res.status(403).json({ message: 'Permission refusée.' });
    }
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé.' });

    await quiz.update({
      difficulty: quizData.difficulty,
      totalScore: quizData.totalScore
    }, { transaction });

    const updatedQuestionIds = [];
    for (let questionData of quizData.questions) {
      const question = await Question.findByPk(questionData.id, { transaction });
      if (!question) {
        return res.status(404).json({ message: `Question with ID ${questionData.id} not found` });
      }

      await question.update({
        questionText: questionData.questionText
      }, { transaction });

      const updatedReponseIds = [];
      for (let reponseData of questionData.reponses) {
        let reponse = await Reponse.findOne({ where: { id: reponseData.id }, transaction });

        if (reponse) {
          await reponse.update({
            reponseText: reponseData.reponseText,
            isCorrect: reponseData.isCorrect
          }, { transaction });
        } else {
          await Reponse.create({
            reponseText: reponseData.reponseText,
            isCorrect: reponseData.isCorrect,
            questId: question.id
          }, { transaction });
        }
        updatedReponseIds.push(reponseData.id);
      }

      updatedQuestionIds.push(questionData.id);
    }

    await Trace.create({
      userId,
      page: 'Quiz',
      action: 'Mise à jour de quiz',
      metadata: {
        quizId: quiz.id,
        updatedQuestionIds,
        updatedReponseIds,
      }
    }, { transaction });

    await transaction.commit();
    return res.status(200).json({
      message: 'Quiz mis à jour avec succès.',
      quiz,
      updatedQuestionIds,
      updatedReponseIds,
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Erreur lors de la mise à jour du quiz:', error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du quiz', error });
  }
};
exports.getAllQuizzes = async (req, res) => {
  try {
    const formationId = req.params.formationId;

    const quizzes = await Quiz.findAll({
      where: { formationId },
      include: [
        {
          model: Question,
          include: [Reponse],
        }
      ],
    });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for this formation.' });
    }

    return res.status(200).json({
      message: 'Quizzes found successfully',
      quizzes,
    });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return res.status(500).json({ message: 'Error fetching quizzes', error });
  }
};
exports.deleteQuiz = async (req, res) => {
  const { quizId } = req.params;
  const transaction = await sequelize.transaction();
  try {
    const quiz = await Quiz.findByPk(quizId, {
      include: [
        { model: Question, include: [Reponse] }
      ],
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const deletedData = {
      quiz: quiz.toJSON(),
      questions: quiz.Questions.map(q => q.toJSON()),
      reponses: quiz.Questions.flatMap(q => q.Reponses.map(r => r.toJSON()))
    };

    await Historisation.create({
      action: 'deleted',
      deleted_data: deletedData,
      quizId: quiz.id,
      userId: req.user.id
    }, { transaction });

    await quiz.destroy({ transaction });

    await Trace.create({
      userId: req.user.id,
      action: 'deleted',
      model: 'Quiz',
      data: {
        quizId: quiz.id,
        title: quiz.title,
        deletedData: deletedData,
      },
    }, { transaction });

    await transaction.commit();

    res.status(200).json({
      message: 'Quiz and related data archived and deleted successfully',
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Error deleting quiz', error });
  }
};

exports.getAllQuizzesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const quizzes = await Quiz.findAll({ where: { userId } });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for this user.' });
    }

    return res.status(200).json({ message: 'Quizzes found successfully', quizzes });
  } catch (error) {
    console.error('Error fetching quizzes by user:', error);
    return res.status(500).json({ message: 'Error fetching quizzes by user', error });
  }
};
exports.getQuizAttemptsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const quizAttempts = await QuizProg.findAll({
      where: { userId },
      include: [
        { model: Quiz, include: [Question] }
      ]
    });

    if (quizAttempts.length === 0) {
      return res.status(404).json({ message: 'No quiz attempts found for this user.' });
    }

    return res.status(200).json({ message: 'Quiz attempts found successfully', quizAttempts });
  } catch (error) {
    console.error('Error fetching quiz attempts by user:', error);
    return res.status(500).json({ message: 'Error fetching quiz attempts by user', error });
  }
};
exports.getQuizResult = async (req, res) => {
  try {
    const userId = req.user.id;
    const quizId = req.params.quizId;

    const quizProg = await QuizProg.findOne({
      where: { userId, quizId },
      include: [
        { model: Quiz },
        { model: Question }
      ]
    });

    if (!quizProg) {
      return res.status(404).json({ message: 'No results found for this quiz attempt.' });
    }

    return res.status(200).json({
      message: 'Quiz result fetched successfully',
      result: {
        score: quizProg.pointGagne,
        completed: quizProg.completed,
        completedAt: quizProg.completedAt,
        totalScore: quizProg.quiz.totalScore
      }
    });
  } catch (error) {
    console.error('Error fetching quiz result:', error);
    return res.status(500).json({ message: 'Error fetching quiz result', error });
  }
};
