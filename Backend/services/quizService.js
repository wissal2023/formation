
const calculateScore = (quiz, userAnswers) => {
    let totalScore = 0;
    let correctAnswers = 0;
  
    for (let i = 0; i < userAnswers.length; i++) {
      const userAnswer = userAnswers[i];
      const question = quiz.Questions[i];  

      const correctReponse = question.Reponses.find(reponse => reponse.isCorrect);
      if (correctReponse && correctReponse.reponseText === userAnswer.answer) {
        correctAnswers++;
        totalScore += question.score;
      }
    }
    return { totalScore, correctAnswers, passed: totalScore >= quiz.totalScore * 0.6 };
  };
  
  const calculatePointGagne = (attemptNumber) => {
    if (attemptNumber === 1) {
      return 20;  // 20 points for the first attempt
    } else if (attemptNumber === 2) {
      return 15;  // 15 points for the second attempt
    } else if (attemptNumber === 3) {
      return 10;  // 10 points for the third attempt
    } else {
      return 5;   // 5 points for subsequent attempts
    }
  };
  
  module.exports = { calculateScore , calculatePointGagne};
  
  