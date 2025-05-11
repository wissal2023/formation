import FormationDetails from "./FormationDetails";
import File from "./File";
import NoteDigital from "./NoteDigital";
import LessonPDF from "./LessonPDF";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
const LessonArea = ({ formationId }) => {

=======
const LessonArea = ({ filename }) => { 
   const navigate = useNavigate();
>>>>>>> c48ccecf (editfront)
   return (
      <section className="lesson__area section-pb-120">
         <div className="container-fluid p-0">
            <div className="row gx-0">
               <div className="col-xl-3 col-lg-4">
                     <h2 className="title">Course Content</h2>
                     {/* to be changed to the note digital */}
                     <NoteDigital formationId={formationId} />
               </div>
             
               <div className="col-xl-9 col-lg-8">
                  <div className="lesson__video-wrap">
                     <div className="lesson__video-wrap-top">
                        <div className="lesson__video-wrap-top-left">
<<<<<<< HEAD
                           <span>Formation ID: {formationId}</span>
=======
>>>>>>> c48ccecf (editfront)
                        </div>
                     </div>
<<<<<<< HEAD
                     {/* Pass the ID to video if needed */}
                     <File formationId={formationId} /> 

                     <div className="lesson__next-prev-button">
                        <button className="prev-button" title="Previous Lesson">
                           <i className="flaticon-arrow-right"></i>
                        </button>
                        <button className="next-button" title="Next Lesson">
                           <i className="flaticon-arrow-right"></i>
                        </button>
                     </div>
=======
                     <LessonPDF filename={filename} /> {/* Pass filename to LessonPDF */}
>>>>>>> c48ccecf (editfront)
                  </div>
                  <FormationDetails  formationId={formationId} />
               </div>
            </div>
         </div>
        
      </section>
   );
};

export default LessonArea;
