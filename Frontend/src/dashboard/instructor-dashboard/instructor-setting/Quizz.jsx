import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './style.css';

const Quizz = ({ formationDetailsId, onPrev, onNext }) => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [reponses, setReponses] = useState([
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [optionType, setOptionType] = useState("Multiple_choice");
  const [reorganizeItems, setReorganizeItems] = useState(["", "", ""]);
  const [matchPairs, setMatchPairs] = useState([{ left: "", right: "" }]);

  const handleAddQuestion = () => {
    if (!question || !optionType) {
      alert("Please fill in both the question and option type.");
      return;
    }

    console.log("Selected Option Type:", optionType);

    let newQuestion = {
      questionText: question,
      optionType: optionType,
    };

    switch (optionType) {
      case "Multiple_choice":
      case "single_choice":
        if (reponses.length === 0) {
          alert("Please provide responses for multiple or single choice.");
          return;
        }
        newQuestion.reponses = reponses.map((rep, index) => ({
          reponseText: rep.text,
          isCorrect: correctAnswers.includes(index),
        }));
        break;

      case "match":
        if (matchPairs.length === 0) {
          alert("Please provide matching pairs.");
          return;
        }
        newQuestion.matchPairs = matchPairs;
        break;

      case "reorganize":
        if (reorganizeItems.length === 0) {
          alert("Please provide reorderable items.");
          return;
        }
        newQuestion.reorganizeItems = reorganizeItems;
        break;

      default:
        alert("Invalid option type.");
        return;
    }

    setQuestions((prev) => [...prev, newQuestion]);
    resetForm();
  };

  const resetForm = () => {
    setQuestion("");
    setReponses([{ text: "" }, { text: "" }, { text: "" }, { text: "" }]);
    setCorrectAnswers([]);
    setOptionType("Multiple_choice");
    setReorganizeItems(["", "", ""]);
    setMatchPairs([{ left: "", right: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (questions.length === 0) {
      toast.error("Please add at least one question.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/quizzes/create`, {
        formationDetailsId,
        questions,
      }, { withCredentials: true });

      toast.success("Quiz created successfully!");
      onNext();
    } catch (error) {
      toast.error("Error creating quiz.");
      console.error(error);
    }
  };

  return (
    <div className="instructor__profile-form-wrap">
      <form onSubmit={handleSubmit} className="customer__form-wrap">
        <span className="title">Create Quiz</span>

        {/* Question Type Selector */}
        <div className="question-type-selector">
          <label>Question Type</label>
          <select value={optionType} onChange={(e) => setOptionType(e.target.value)}>
            <option value="Multiple_choice">Multiple Choice</option>
            <option value="single_choice">Single Choice</option>
            <option value="reorganize">Reorganize</option>
            <option value="match">Match</option>
          </select>
        </div>

        {/* Question Input */}
        <div className="quiz-form-grp">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
          />
        </div>

        {/* Multiple / Single Choice Options */}
        {["Multiple_choice", "single_choice"].includes(optionType) &&
          reponses.map((rep, index) => (
            <div key={index} className="quiz-form-grp">
              <input
                type="text"
                placeholder={`Answer ${index + 1}`}
                value={rep.text}
                onChange={(e) => {
                  const updated = [...reponses];
                  updated[index].text = e.target.value;
                  setReponses(updated);
                }}
              />
              {optionType === "Multiple_choice" ? (
                <input
                  type="checkbox"
                  checked={correctAnswers.includes(index)}
                  onChange={() => {
                    const updatedAnswers = correctAnswers.includes(index)
                      ? correctAnswers.filter((i) => i !== index)
                      : [...correctAnswers, index];
                    setCorrectAnswers(updatedAnswers);
                  }}
                />
              ) : (
                <input
                  type="radio"
                  name="radio-group"
                  checked={correctAnswers.includes(index)}
                  onChange={() => {
                    setCorrectAnswers([index]);
                  }}
                />
              )}
            </div>
          ))}

        {/* Reorganize */}
        {optionType === "reorganize" &&
          reorganizeItems.map((item, index) => (
            <div key={index} className="quiz-form-grp">
              <input
                type="text"
                placeholder={`Step ${index + 1}`}
                value={item}
                onChange={(e) => {
                  const updated = [...reorganizeItems];
                  updated[index] = e.target.value;
                  setReorganizeItems(updated);
                }}
              />
            </div>
          ))}

        {optionType === "reorganize" && (
          <button type="button" className="pill-button" onClick={() => setReorganizeItems([...reorganizeItems, ""])} >
            Add Step
          </button>
        )}

        {/* Match */}
        {optionType === "match" &&
          matchPairs.map((pair, index) => (
            <div key={index} className="quiz-form-grp d-flex gap-2">
              <input
                type="text"
                placeholder={`Left ${index + 1}`}
                value={pair.left}
                onChange={(e) => {
                  const updated = [...matchPairs];
                  updated[index].left = e.target.value;
                  setMatchPairs(updated);
                }}
              />
              <input
                type="text"
                placeholder={`Right ${index + 1}`}
                value={pair.right}
                onChange={(e) => {
                  const updated = [...matchPairs];
                  updated[index].right = e.target.value;
                  setMatchPairs(updated);
                }}
              />
            </div>
          ))}

        {optionType === "match" && (
          <button type="button" className="pill-button" onClick={() => setMatchPairs([...matchPairs, { left: "", right: "" }])}>
            Add Match Pair
          </button>
        )}

        <button type="button" className="pill-button" onClick={handleAddQuestion}>
          Add Question
        </button>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-3">
          <button type="button" className="pill-button" onClick={onPrev}>
            Previous
          </button>
          <button type="submit" className="pill-button">
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quizz;