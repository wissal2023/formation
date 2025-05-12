import { useState, useEffect } from "react";
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
  const addStep = () => setReorganizeItems([...reorganizeItems, ""]);
  const addMatchPair = () => setMatchPairs([...matchPairs, { left: "", right: "" }]);


  useEffect(() => {
    // Reset when question type changes
    setReorganizeItems(["", "", ""]);
    setMatchPairs([{ left: "", right: "" }]);
  }, [optionType]);

  const handleAddQuestion = () => {
    if (!question.trim()) {
      toast.error("Question text is required.");
      return;
    }

    let newQuestion = {
      questionText: question,
      optionType: optionType,
    };

    if (optionType === "Multiple_choice" || optionType === "single_choice") {
      const filteredResponses = reponses
        .map((r) => r.text.trim())
        .map((text, index) => ({ text, index }))
        .filter((r) => r.text);


      if (filteredResponses.length < 2) {
        toast.error("At least two non-empty responses are required.");
        return;
      }

      newQuestion.reponses = filteredResponses.map(({ text, index }) => ({
        reponseText: text,
        isCorrect: correctAnswers.includes(index),
        points: 1,
      }));
    } else if (optionType === "match") {
      const filteredPairs = matchPairs.filter(
        (pair) => pair.left.trim() && pair.right.trim()
      );
      if (filteredPairs.length < 1) {
        toast.error("At least one valid match pair is required.");
        return;
      }
      newQuestion.matchPairs = filteredPairs;
    } else if (optionType === "reorganize") {
      const filteredSteps = reorganizeItems.filter((item) => item.trim());
      if (filteredSteps.length < 2) {
        toast.error("At least two steps are required.");

        return;
      }
      newQuestion.reorganizeItems = filteredSteps;
    }

    setQuestions([...questions, newQuestion]);


    // Reset fields

    setQuestion("");
    setOptionType("Multiple_choice");
    setReponses([{ text: "" }, { text: "" }, { text: "" }, { text: "" }]);
    setCorrectAnswers([]);
    setReorganizeItems(["", "", ""]);
    setMatchPairs([{ left: "", right: "" }]);
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
    if (questions.length === 0) {
      toast.error("Please add at least one question.");
      return;

    }
    // Log the payload before sending
    const payload = {
        formationDetailsId,
        questions,
    };
    console.log("Payload being sent to API:", payload);


    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/quizzes/create`,
        {
          formationDetailsId,
          questions,
        },
        { withCredentials: true }
      );

      toast.success("Quiz created successfully!");
      onNext();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating quiz.");
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

          <select
            value={optionType}
            onChange={(e) => setOptionType(e.target.value)}
          >

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
          <button
            type="button"
            className="pill-button"
            onClick={() => setReorganizeItems([...reorganizeItems, ""])}
          >
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
          <button
            type="button"
            className="pill-button"
            onClick={() =>
              setMatchPairs([...matchPairs, { left: "", right: "" }])
            }
          >
            Add Match Pair
          </button>
        )}

        <button
          type="button"
          className="pill-button mt-2"
          onClick={handleAddQuestion}
        >
          Add Question
        </button>


        {/* Preview Added Questions */}
        {questions.length > 0 && (
          <div className="preview-questions mt-4">
            <h5>Preview Questions:</h5>
            <ul>
              {questions.map((q, i) => (
                <li key={i}>
                  {i + 1}. {q.questionText} ({q.optionType})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-3">
          <button type="button" className="pill-button" onClick={onPrev}>Previous</button>
          <button type="submit" className="pill-button"> Submit Quiz</button>
        </div>
      </form>
    </div>
  );
};

export default Quizz;
