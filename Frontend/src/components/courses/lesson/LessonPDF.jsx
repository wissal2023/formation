import { useEffect, useState } from 'react';
import axios from 'axios';

const LessonPDF = ({ formationId }) => {
   const [documents, setDocuments] = useState([]);
   const [error, setError] = useState(null);

   useEffect(() => {
      const API = import.meta.env.VITE_API_URL;

      const fetchDocuments = async () => {
         try {
            const res = await axios.get(`${API}/documents/byFormation/${formationId}`, {
               withCredentials: true,
            });

            const docs = res.data.documents;

            if (docs.length > 0) {
               setDocuments(docs);
            } else {
               setError('Aucun document PDF trouvé pour cette formation.');
            }
         } catch (err) {
            console.error('❌ Erreur lors du chargement des PDF:', err);
            setError("Erreur lors de la récupération des documents PDF.");
         }
      };

      if (formationId) {
         fetchDocuments();
      }
   }, [formationId]);

   return (
      <div className="lesson-pdf-list" style={{ padding: '20px' }}>
         {error && <p style={{ color: 'red' }}>{error}</p>}

         {documents.length > 0 ? (
            documents.map((doc, index) => (
               <div key={index} style={{ marginBottom: '40px', height: '90vh' }}>
                  <iframe
                     src={`${import.meta.env.VITE_API_URL}/documents/view/${doc.filename}`}
                     width="100%"
                     height="100%"
                     title={`Document ${index + 1}`}
                     style={{ border: '1px solid #ccc' }}
                  />
               </div>
            ))
         ) : (
            !error && <p>Chargement des documents PDF...</p>
         )}
      </div>
   );
};

export default LessonPDF;
