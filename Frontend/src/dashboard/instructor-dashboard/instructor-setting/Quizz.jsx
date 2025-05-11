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
  const [optionQuet, setOptionQuet] = useState("Multiple_choice");
  const [reorganizeItems, setReorganizeItems] = useState(["", "", ""]);
  const [matchPairs, setMatchPairs] = useState([{ left: "", right: "" }]);

  // Handle correct answer selection
  const handleCorrectChange = (index) => {
    if (optionQuet === "Multiple_choice") {
      setCorrectAnswers((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setCorrectAnswers([index]);
    }
  };

  const handleReponseChange = (index, value) => {
    const newReponses = [...reponses];
    newReponses[index].text = value;
    setReponses(newReponses);
  };

  const handleReorganizeChange = (index, value) => {
    const newItems = [...reorganizeItems];
    newItems[index] = value;
    setReorganizeItems(newItems);
  };

  const handleMatchPairChange = (index, field, value) => {
    const updatedPairs = [...matchPairs];
    updatedPairs[index][field] = value;
    setMatchPairs(updatedPairs);
  };

  const addStep = () => setReorganizeItems([...reorganizeItems, ""]);
  const addMatchPair = () => setMatchPairs([...matchPairs, { left: "", right: "" }]);

  const addQuestion = () => {
    if (!question.trim()) {
      toast.error("Please enter the question.");
      return;
    }

    // For "Reorganize" questions
    if (optionQuet === "Reorganize") {
      const validItems = reorganizeItems.filter((item) => item.trim() !== "");
      if (validItems.length < 3) {
        toast.error("Enter at least three steps for the reorganize question.");
        return;
      }

      setQuestions([...questions, {
        questionText: question,
        optionQuet: "Reorganize",
        correctOrder: validItems,
      }]);

      resetForm();
      return;
    }

    // For "Match" questions
    if (optionQuet === "Match") {
      const validPairs = matchPairs.filter(p => p.left.trim() && p.right.trim());
      if (validPairs.length < 3) {
        toast.error("Enter at least three match pairs.");
        return;
      }

      setQuestions([...questions, {
        questionText: question,
        optionQuet: "Match",
        matchPairs: validPairs,
      }]);

      resetForm();
      return;
    }

    // For "Multiple_choice" and "Single_choice"
    if (reponses.some((r) => !r.text.trim())) {
      toast.error("All answer fields must be filled.");
      return;
    }

    // Validate correct answers based on the question type
    if (optionQuet === "Multiple_choice") {
      if (correctAnswers.length < 2) {
        toast.error("Please select at least two correct answers.");
        return;
      }
      if (correctAnswers.length > 3) {
        toast.error("You can't select more than three correct answers.");
        return;
      }
    } else if (optionQuet === "Single_choice") {
      if (correctAnswers.length !== 1) {
        toast.error("Please select exactly one correct answer.");
        return;
      }
    }

    const mappedReponses = reponses.map((rep, index) => ({
      reponseText: rep.text,
      isCorrect: correctAnswers.includes(index),
      points: 1,
    }));

    setQuestions([...questions, {
      questionText: question,
      optionQuet,
      reponses: mappedReponses,
    }]);

    resetForm();
  };

  const resetForm = () => {
    setQuestion("");
    setReponses([{ text: "" }, { text: "" }, { text: "" }, { text: "" }]);
    setCorrectAnswers([]);
    setOptionQuet("Multiple_choice");
    setReorganizeItems(["", "", ""]);
    setMatchPairs([{ left: "", right: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (questions.length === 0) {
      toast.error("Please add at least one question before submitting.");
      return;
    }

    try {
      // Send the quiz data to the backend
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
          <select value={optionQuet} onChange={(e) => setOptionQuet(e.target.value)}>
            <option value="Multiple_choice">Multiple Choice</option>
            <option value="Single_choice">Single Choice</option>
            <option value="Reorganize">Reorganize</option>
            <option value="Match">Match</option>
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

        {/* Multiple/Single Choice */}
        {["Multiple_choice", "Single_choice"].includes(optionQuet) &&
          reponses.map((rep, index) => (
            <div key={index} className="quiz-form-grp">
              <input
                type="text"
                placeholder={`Answer ${index + 1}`}
                value={rep.text}
                onChange={(e) => handleReponseChange(index, e.target.value)}
              />
              {optionQuet === "Multiple_choice" ? (
                <input
                  type="checkbox"
                  checked={correctAnswers.includes(index)}
                  onChange={() => handleCorrectChange(index)}
                />
              ) : (
                <input
                  type="radio"
                  name="radio-group"
                  checked={correctAnswers.includes(index)}
                  onChange={() => handleCorrectChange(index)}
                />
              )}
            </div>
          ))
        }

        {/* Reorganize Input */}
        {optionQuet === "Reorganize" &&
          reorganizeItems.map((item, index) => (
            <div key={index} className="quiz-form-grp">
              <input
                type="text"
                placeholder={`Step ${index + 1}`}
                value={item}
                onChange={(e) => handleReorganizeChange(index, e.target.value)}
              />
            </div>
          ))
        }

        {optionQuet === "Reorganize" && (
          <button type="button" className="pill-button" onClick={addStep}>
            Add Step
          </button>
        )}

        {/* Match Input */}
        {optionQuet === "Match" &&
          matchPairs.map((pair, index) => (
            <div key={index} className="quiz-form-grp d-flex gap-2">
              <input
                type="text"
                placeholder={`Left ${index + 1}`}
                value={pair.left}
                onChange={(e) => handleMatchPairChange(index, "left", e.target.value)}
              />
              <input
                type="text"
                placeholder={`Right ${index + 1}`}
                value={pair.right}
                onChange={(e) => handleMatchPairChange(index, "right", e.target.value)}
              />
            </div>
          ))
        }

        {optionQuet === "Match" && (
          <button type="button" className="pill-button" onClick={addMatchPair}>
            Add Match Pair
          </button>
        )}

        <button type="button" className="pill-button" onClick={addQuestion}>
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

export default Quizz;
