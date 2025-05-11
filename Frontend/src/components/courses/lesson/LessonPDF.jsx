import { Worker, Viewer } from "@react-pdf-viewer/core";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useEffect, useState } from "react";
import axios from 'axios';

const LessonPDF = ({ filename }) => {
   const [pdfBlobUrl, setPdfBlobUrl] = useState('');
   const API = import.meta.env.VITE_API_URL;

   useEffect(() => {
      if (filename) {
         const url = `${API}/documents/view/${filename}`;

         axios.get(url, {
            responseType: 'blob', // Get the actual PDF binary data
            withCredentials: true
         })
         .then(res => {
            const blob = new Blob([res.data], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            setPdfBlobUrl(blobUrl);
         })
         .catch(err => {
            console.error("Error fetching PDF:", err);
         });

         // Clean up blob URL when component unmounts or filename changes
         return () => {
            if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
         };
      }
   }, [filename]);

   return (
      <div style={{ height: '600px', width: '100%' }}>
         <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
            {pdfBlobUrl && <Viewer fileUrl={pdfBlobUrl} />}
         </Worker>
      </div>
   );
};

export default LessonPDF;
