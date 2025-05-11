import { Link, useParams } from "react-router-dom";
import LessonFaq from "./LessonFaq";
import LessonNavTav from "./LessonNavTav";
import LessonVideo from "./LessonVideo";
import LessonPDF from "./LessonPDF";
import { useNavigate } from "react-router-dom";

const LessonArea = ({ filename }) => { 
   const navigate = useNavigate();
   const {  id:formationId  } = useParams(); // Correctly extracting 'id' from URL params
   
   return (
      <section className="lesson__area section-pb-120">
         <div className="container-fluid p-0">
            <div className="row gx-0">
               <div className="col-xl-3 col-lg-4">
                  <div className="lesson__content">
                     <h2 className="title">Course Content</h2>
                     <LessonFaq />
                  </div>
               </div>
             
               <div className="col-xl-9 col-lg-8">
                  <div className="lesson__video-wrap">
                     <div className="lesson__video-wrap-top">
                        <div className="lesson__video-wrap-top-left">
                        </div>
                        <div className="lesson__video-wrap-top-right">
                           <Link to="#"><i className="fas fa-times"></i></Link>
                        </div> 
                     </div>
                     <LessonPDF filename={filename} /> {/* Pass filename to LessonPDF */}
                  </div>
                  
                  {/* Button to go to quiz */}
                  <div className="pill-button-container">
                     <Link to={`/passerQuiz/${formationId}`} className="pill-button">
                        Go to Quiz
                     </Link>
                  </div>
                  
                  {/* Lesson navigation tab */}
                  <LessonNavTav />
               </div>
            </div>
         </div>
      </section>
   );
};

export default LessonArea;