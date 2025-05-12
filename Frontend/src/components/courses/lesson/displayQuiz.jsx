import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './DisplayQuiz.css';
import HeaderOne from '../../../layouts/headers/HeaderOne';
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
      const response = await axios.post(
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
   
    <div className="col-xl-9 col-lg-8" style={{ maxWidth: '100%', padding: '1rem' }}>
      <div className="lesson__video-wrap">
        <div className="lesson__video-wrap-top" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Quiz</h1>
          <button onClick={() => navigate(-1)} style={{ fontSize: '1.25rem' }}>
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="quiz-content" style={{ marginTop: '1rem' }}>
          <h3>{currentQuestion.questionText}</h3>

          {/* Single or Multiple Choice */}
          {(currentQuestion.optionType === 'Multiple_choice' || currentQuestion.optionType === 'single_choice') && (
            <div>
              {currentQuestion.reponses.map(option => {
                const checked =
                  currentQuestion.optionType === 'Multiple_choice'
                    ? (userAnswers[currentQuestion.id] || []).includes(option.id)
                    : userAnswers[currentQuestion.id] === option.id;

                return (
                  <div key={option.id} style={{ marginBottom: '0.5rem' }}>
                    <label>
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
                        style={{ marginRight: '8px' }}
                      />
                      {option.reponseText}
                    </label>
                  </div>
                );
              })}
            </div>
          )}

          {/* Match */}
          {currentQuestion.optionType === 'Match' && (
            <div>
              <p>Match the pairs:</p>
              {currentQuestion.matchPairs.map((pair, idx) => {
                const userPair = (userAnswers[currentQuestion.id] && userAnswers[currentQuestion.id][idx]) || {
                  left: '',
                  right: '',
                };
                return (
                  <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Left"
                      value={userPair.left}
                      onChange={e => handleMatchChange(currentQuestion.id, 'left', idx, e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <input
                      type="text"
                      placeholder="Right"
                      value={userPair.right}
                      onChange={e => handleMatchChange(currentQuestion.id, 'right', idx, e.target.value)}
                      style={{ flex: 1 }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Reorganize */}
          {currentQuestion.optionType === 'reorganize' && (
            <div>
              <p>Arrange the steps in the correct order:</p>
              {currentReorganizeAnswer.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span>{item}</span>
                  <div>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() =>
                        handleReorganizeChange(
                          currentQuestion.id,
                          moveItem(currentReorganizeAnswer, idx, idx - 1)
                        )
                      }
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={idx === currentReorganizeAnswer.length - 1}
                      onClick={() =>
                        handleReorganizeChange(
                          currentQuestion.id,
                          moveItem(currentReorganizeAnswer, idx, idx + 1)
                        )
                      }
                    >
                      ▼
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === quiz.questions.length - 1}
            >
              Next
            </button>
          </div>

          {/* Submit Button */}
          {currentQuestionIndex === quiz.questions.length - 1 && (
            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={handleSubmit}
                disabled={!isAllAnswered}
                style={{
                  backgroundColor: isAllAnswered ? '#28a745' : '#ccc',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  cursor: isAllAnswered ? 'pointer' : 'not-allowed',
                }}
              >
                Submit Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DisplayQuiz;

