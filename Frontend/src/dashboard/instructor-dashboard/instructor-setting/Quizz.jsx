import {  useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { toast } from 'react-toastify';
  
// Validation schema
const schema = yup.object({
 
}).required();

const Quizz = ({ formationDetailsId, onPrev, onNext }) => {
   
   const [questions, setQuestions] = useState([]);
   const [question, setQuestion] = useState("");
   const [reponses, setReponses] = useState([{ text: "", points: 1 },{ text: "", points: 1 }, { text: "", points: 1 }, { text: "", points: 1 }]);
   const [correctAnswers, setCorrectAnswers] = useState([]);
   const [optionQuet, setOptionQuet] = useState("Multiple_choice");
  
   // Handle correct answers for multiple choices
   const handleCorrectChange = (value) => {
      if (optionQuet === "Multiple_choice") {
      setCorrectAnswers((prev) =>
         prev.includes(value)
            ? prev.filter((val) => val !== value)
            : [...prev, value]
      );
      } else {
      setCorrectAnswers(value);
      }
   };

   const addQuestion = () => {
      const questionData = {
        question,
        optionQuet,
        reponses,
        correctAnswers
      };
    
      setQuestions([...questions, questionData]);
      setQuestion("");
      setReponses([{ text: "", points: 1 },
                   { text: "", points: 1 }, 
                   { text: "", points: 1 }, 
                   { text: "", points: 1 }]);
      setCorrectAnswers([]);
      setOptionQuet("Multiple_choice");
    };
    

    const handleReponseChange = (index, newValue) => {
      const newReponses = [...reponses];
      newReponses[index] = newValue;
      setReponses(newReponses);
    };
    

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post(`${import.meta.env.VITE_API_URL}/quizzes/create`, {
            questions,            
            formationDetailsId, 
            withCredentials: true
         });

         toast.success("Quiz created successfully!");
         onNext(); 
      } catch (error) {
         toast.error("Error creating quiz.");
         console.error(error);
      }
   };

   return (
      <div className="col-lg-7">
         <form onSubmit={handleSubmit} className="customer__form-wrap">
            <span className="title">Create Quiz</span>
               {/* Question Type Selector */}
               <div className="form-grp">
               <label>Question Type</label>
               <select value={optionQuet} onChange={(e) => setOptionQuet(e.target.value)}>
                  <option value="Multiple_choice">Multiple Choice</option>
                  <option value="Yes/No">Yes / No</option>
                  <option value="reorginize">Reorganize</option>
                  <option value="Match">Match</option>
                  <option value="Drag/Drop">Drag & Drop</option>
               </select>
               </div>

               {/* Correct answer(s) input - multiple checkboxes for Multiple_choice */}
               {optionQuet === "Multiple_choice" && (
               <div className="form-grp">
                  <label>Correct Answers</label>
                  {reponses.map((r, i) => (
                     <div key={i}>
                        <input
                           type="text"
                           value={r.text}
                           onChange={(e) =>
                           handleReponseChange(i, { ...r, text: e.target.value })
                           }
                        />
                        <input
                           type="number"
                           value={r.points}
                           onChange={(e) =>
                           handleReponseChange(i, { ...r, points: parseInt(e.target.value) })
                           }
                        />
                     </div>
                     ))}

               </div>
               )}

               {/* Dropdown for Yes/No or single-answer types */}
               {optionQuet === "Yes/No" && (
               <div className="form-grp">
                  <label>Correct Answer</label>
                  <select onChange={(e) => setCorrectAnswers(e.target.value)}>
                     <option value="">Select</option>
                     <option value="Yes">Yes</option>
                     <option value="No">No</option>
                  </select>
               </div>
               )}
               {reponses.map((rep, index) => (
  <div key={index} className="form-grp">
    <input
      type="text"
      value={rep.text}
      onChange={(e) => {
        const newReps = [...reponses];
        newReps[index].text = e.target.value;
        setReponses(newReps);
      }}
      placeholder={`Réponse ${index + 1}`}
    />
    <input
      type="number"
      value={rep.points}
      onChange={(e) => {
        const newReps = [...reponses];
        newReps[index].points = parseInt(e.target.value, 10);
        setReponses(newReps);
      }}
      placeholder="Points"
    />
    {optionQuet === "Multiple_choice" && (
      <input
        type="checkbox"
        checked={correctAnswers.includes(rep.text)}
        onChange={() => handleCorrectChange(rep.text)}
      />
    )}
  </div>
))}

<button type="button" className="btn btn-secondary" onClick={addQuestion}>
  Ajouter la question
</button>


            <div className="d-flex justify-content-between mt-3">
               <button type="button" className="btn btn-secondary" onClick={onPrev}>
                  Previous
               </button>
               <button type="submit" className="btn btn-primary">
                  Submit Quiz
               </button>
            </div>
         </form>
      </div>
   );

}
export default Quizz;
