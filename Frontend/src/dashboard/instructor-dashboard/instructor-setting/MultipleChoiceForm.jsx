import { useState } from "react";

const MultipleChoiceForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([{ text: "", isCorrect: false }]);

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: "", isCorrect: false }]);
  };

  return (
    <div>
      <label>Question</label>
      <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} placeholder="Entrez la question"/>
      <h5>Réponses</h5>
      {answers.map((a, idx) => (
        <div key={idx}>
          <input type="text" value={a.text} onChange={(e) => { 
            const newAnswers = [...answers]; 
                  newAnswers[idx].text = e.target.value; 
                  setAnswers(newAnswers); }} />
            <label> 
              <input type="checkbox" checked={a.isCorrect} onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[idx].isCorrect = e.target.checked; 
                setAnswers(newAnswers); }}/> reponse correcte
              </label>
        </div>
      ))}

      <button onClick={handleAddAnswer}>Ajouter une réponse</button>
    </div>
  );
};

export default MultipleChoiceForm;
