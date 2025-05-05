"use client";
import FormationForm from "../../../forms/FormationForm";
import FormationDetails from "../../../forms/FormationDetails";
import UploadContent from "./UploadContent";
import Quizz from "./Quizz";
import { useState } from "react";

const tab_title = ["1 - formation", "2 - formation details", "3 - upload content", "4 - quizz"];

const Stepper = ({ userId , style }) => {
   const [activeTab, setActiveTab] = useState(0);
   const [formationId, setFormationId] = useState(null);
   const [formationDetailsId, setFormationDetailsId] = useState(null);

   const handleTabClick = (index) => {
      if (index <= activeTab) {//to ensures users can't skip ahead before completing current steps.
         setActiveTab(index);
      }
      };

   const handleNext = (newId) => {
      if (activeTab === 0) {
         console.log("✅ Received formationId from FormationForm:", newId);
         setFormationId(newId);
      } else if (activeTab === 1) {
         console.log("✅ Received formationDetailsId from FormationDetails:", newId);
         setFormationDetailsId(newId);
      }
      setActiveTab((prev) => prev + 1);
      };
       

   const handlePrev = () => {
      setActiveTab((prev) => Math.max(prev - 1, 0));
    };
    
   return (
      <div className="col-lg-9">
         <div className="dashboard__content-wrap">
            <div className="dashboard__content-title">
               <h4 className="title">Add formation</h4>
            </div>
            <div className="row">
               <div className="col-lg-12">
                  <div className="dashboard__nav-wrap">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                     {tab_title.map((tab, index) => (
                        <li key={index} className="nav-item" role="presentation">
                           <button
                           className={`nav-link 
                              ${activeTab === index ? "active" : ""} 
                              ${index < activeTab ? "completed" : ""} 
                              ${index > activeTab ? "disabled" : ""}`}                            
                              onClick={() => handleTabClick(index)}
                              disabled={index > activeTab}>
                           {tab}
                           </button>
                        </li>
                     ))}
                  </ul>
                  </div>
                  <div className="tab-content" id="myTabContent">
                     <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="itemOne-tab-pane" role="tabpanel" aria-labelledby="itemOne-tab" >
                        <FormationForm userId={userId} onNext={handleNext}  style={style} />
                     </div>
                     <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="itemTwo-tab-pane" role="tabpanel" aria-labelledby="itemTwo-tab" >
                        <FormationDetails formationId={formationId} onPrev={handlePrev} onNext={handleNext}/>
                     </div>
                     <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`} id="itemThree-tab-pane" role="tabpanel" aria-labelledby="itemThree-tab" >
                        <UploadContent formationDetailsId={formationDetailsId} onPrev={handlePrev} onNext={handleNext}/>
                     </div>
                     <div className={`tab-pane fade ${activeTab === 3 ? 'show active' : ''}`} id="itemFour-tab-pane" role="tabpanel" aria-labelledby="itemFour-tab" >
                        <Quizz formationDetailsId={formationDetailsId} onPrev={handlePrev} onNext={handleNext}/>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Stepper;
