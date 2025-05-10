import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const UploadContent = ({ formationDetailsId, onPrev, onNext }) => {
   const [file, setFile] = useState(null);
   const navigate = useNavigate();
 
   const handleFileChange = (e) => {
     setFile(e.target.files[0]);
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
 
     if (!file || !formationDetailsId) {
       toast.error("Fichier ou formationDetailsId manquant !");
       return;
     }
 
     const formData = new FormData();
     formData.append("file", file);
     formData.append("formationDetailsId", formationDetailsId);
 
     try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/documents/AddDoc`, formData, {
         withCredentials: true
       });
       
       toast.success("file uploaded successfully!");
       console.log("✅ Uploaded file success:", response.data);
       onNext(); 
     } catch (error) {
       console.error("Erreur upload", error);
       toast.error("Échec de l'envoi du fichier.");
     }
   };
 
   return (
      <div className="instructor__profile-form-wrap">
        <form onSubmit={handleSubmit} className="instructor__profile-form">
          <div className="form-grp">
            <label htmlFor="file">Upload your module file</label>
            <input type="file" id="file" onChange={handleFileChange} className="form-control" />
          </div>
 
          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="pill-button" onClick={onPrev}>
              Back
            </button>
            <button type="submit" className="pill-button">
              Upload and Next
            </button>
          </div>
        </form>
      </div>
    );
 };
 

export default UploadContent;
