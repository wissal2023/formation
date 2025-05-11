import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './DisplayQuiz.css';

const DisplayQuiz = () => {
  const { id: formationId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/quizzes/formation/${formationId}`,
          { withCredentials: true }
        );
        setQuiz({
          id: response.data.id || null,
          title: response.data.title || "Quiz d'évaluation",
          questions: response.data.questions || []
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setLoading(false);
      }
    };
    fetchQuizData();
  }, [formationId]);

  const handleSingleChoiceChange = (questionId, answerId) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleMultipleChoiceChange = (questionId, answerId) => {
    setUserAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      return {
        ...prev,
        [questionId]: currentAnswers.includes(answerId)
          ? currentAnswers.filter(a => a !== answerId)
          : [...currentAnswers, answerId],
      };
    });
  };

  const handleMatchChange = (questionId, side, index, value) => {
    setUserAnswers(prev => {
      const currentPairs = prev[questionId] || [];
      const updatedPairs = [...currentPairs];
      updatedPairs[index] = { ...(updatedPairs[index] || {}), [side]: value };
      return {
        ...prev,
        [questionId]: updatedPairs,
      };
    });
  };

  const handleReorganizeChange = (questionId, newOrder) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: newOrder,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/quizzes/${quiz.id}/attempt`,
        { userAnswers },
        { withCredentials: true }
      );
      setIsSubmitted(true);
      navigate('/quiz-results');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const moveItem = (arr, from, to) => {
    const newArr = [...arr];
    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);
    return newArr;
  };

  if (loading) return <div className="loading">Chargement du quiz...</div>;

  if (!quiz || !quiz.questions || quiz.questions.length === 0)
    return <div className="error">Aucune question disponible pour ce quiz.</div>;
    
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentReorganizeAnswer =
    userAnswers[currentQuestion?.id] || currentQuestion?.reorganizeItems || [];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>{quiz.title || "Quiz d'évaluation"}</h1>
      </div>

      {/* Progress indicator */}
      <div className="progress-bar">
        <div className="progress-info">
          <span>Question {currentQuestionIndex + 1} sur {quiz.questions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}% complété</span>
        </div>
        <div className="progress-track">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="question-box">
        <div className="question-display">
          <div className="question-label">Question</div>
          <div className="fixed-question">zezez</div>
        </div>

        {(currentQuestion.optionType === 'Multiple_choice' ||
          currentQuestion.optionType === 'single_choice') && (
          <div className="options-list">
            {currentQuestion.reponses.map(option => {
              const checked =
                currentQuestion.optionType === 'Multiple_choice'
                  ? (userAnswers[currentQuestion.id] || []).includes(option.id)
                  : userAnswers[currentQuestion.id] === option.id;

              return (
                <label key={option.id} className={`option-item ${checked ? 'selected' : ''}`}>
                  <input
                    type={currentQuestion.optionType === 'Multiple_choice' ? 'checkbox' : 'radio'}
                    name={`question-${currentQuestion.id}`}
                    value={option.id}
                    checked={checked}
                    onChange={() =>
                      currentQuestion.optionType === 'Multiple_choice'
                        ? handleMultipleChoiceChange(currentQuestion.id, option.id)
                        : handleSingleChoiceChange(currentQuestion.id, option.id)
                    }
                  />
                  {option.reponseText}
                </label>
              );
            })}
          </div>
        )}

        {currentQuestion.optionType === 'Match' && (
          <div className="match-pairs">
            <p className="match-instruction">Associez les éléments correspondants:</p>
            {currentQuestion.matchPairs?.map((_, idx) => {
              const userPair = userAnswers[currentQuestion.id]?.[idx] || { left: '', right: '' };
              return (
                <div key={idx} className="match-row">
                  <input
                    type="text"
                    placeholder="Élément gauche"
                    value={userPair.left}
                    onChange={e => handleMatchChange(currentQuestion.id, 'left', idx, e.target.value)}
                  />
                  <span className="match-arrow">⇔</span>
                  <input
                    type="text"
                    placeholder="Élément droit"
                    value={userPair.right}
                    onChange={e => handleMatchChange(currentQuestion.id, 'right', idx, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {currentQuestion.optionType === 'reorganize' && (
          <div className="reorganize-list">
            <p className="reorganize-instruction">Arrangez les éléments dans le bon ordre:</p>
            {currentReorganizeAnswer.map((item, idx) => (
              <div key={idx} className="reorganize-item">
                <span>{idx + 1}. {item}</span>
                <div className="reorganize-controls">
                  <button
                    onClick={() =>
                      handleReorganizeChange(currentQuestion.id, moveItem(currentReorganizeAnswer, idx, idx - 1))
                    }
                    disabled={idx === 0}
                    className={idx === 0 ? 'disabled' : ''}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() =>
                      handleReorganizeChange(currentQuestion.id, moveItem(currentReorganizeAnswer, idx, idx + 1))
                    }
                    disabled={idx === currentReorganizeAnswer.length - 1}
                    className={idx === currentReorganizeAnswer.length - 1 ? 'disabled' : ''}
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="quiz-nav">
          <button 
            className="nav-btn prev-btn"
            onClick={prevQuestion} 
            disabled={currentQuestionIndex === 0}
          >
            ← Précédent
          </button>
          
          <div className="pagination-dots">
            {Array.from({ length: quiz.questions.length || 3 }).map((_, idx) => (
              <button 
                key={idx}
                className={`dot ${idx === currentQuestionIndex ? 'active' : ''}`}
                onClick={() => setCurrentQuestionIndex(idx)}
              />
            ))}
          </div>
          
          <button 
            className="nav-btn next-btn"
            onClick={nextQuestion} 
            disabled={currentQuestionIndex === quiz.questions.length - 1}
          >
            Suivant →
          </button>
        </div>

        {currentQuestionIndex === quiz.questions.length - 1 && (
          <div className="submit-section">
            <button
              className="submit-btn"
              onClick={handleSubmit}
            >
              Soumettre
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayQuiz;