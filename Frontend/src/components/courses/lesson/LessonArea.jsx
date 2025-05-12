
import { useEffect, useState } from "react";
import axios from "axios";
import FormationDetails from "./FormationDetails";
import File from "./File";
import NoteDigital from "./NoteDigital";
import LessonPDF from "./LessonPDF";
import { useNavigate } from "react-router-dom";
const LessonArea = ({ formationId }) => {
   const [documentData, setDocumentData] = useState(null);
   const navigate = useNavigate();
   useEffect(() => {
      const fetchDocument = async () => {
         try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/documents/${formationId}`, {
               withCredentials: true,
            });
            setDocumentData(res.data); // This includes filename, filetype, etc.
         } catch (err) {
            console.error("Error fetching document details:", err);
         }
      };

      if (formationId) fetchDocument();
   }, [formationId]);

   return (
      <section className="lesson__area section-pb-120">
         <div className="container-fluid p-0">
            <div className="row gx-0">
               <div className="col-xl-3 col-lg-4">
                     <h2 className="title">Course Content</h2>
                     <NoteDigital formationId={formationId} />
               </div>

               <div className="col-xl-9 col-lg-8">
                  <div className="lesson__video-wrap">
                     <div className="lesson__video-wrap-top">
                        <div className="lesson__video-wrap-top-left">
                           <span>Formation ID: {formationId}</span>
                        </div>
                     </div>
                  </div>
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
                     {/* Conditionally render based on filetype */}
                     {documentData?.filetype?.includes('mp4') && (
                        <File formationId={formationId} />
                     )}
                     {documentData?.filetype?.includes('pdf') && (
                        <LessonPDF filename={documentData.filename} />
                     )}
                  </div>       
                   {/* Button to go to quiz */}
                  <div className="pill-button-container">
                     <Link to={`/passerQuiz/${formationId}`} className="pill-button">
                        Go to Quiz
                     </Link>
                  </div>
                  <FormationDetails formationId={formationId} />
                  {/* Lesson navigation tab */}
                  <LessonNavTav />

               </div>
            </div>
         </div>
      </section>
   );
};
export default LessonArea;
