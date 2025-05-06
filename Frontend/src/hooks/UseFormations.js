import { useEffect, useState } from "react";
import axios from "axios";
//import { useSelector } from "react-redux";
//import { selectCourses } from "../redux/features/courseSlice";

const UseFormations = () => {
   //const [courses, setCourses] = useState(useSelector(selectCourses))
   
   const [formations, setFormations] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   
   useEffect(() => {
      const fetchFormations = async () => {
         try {
            const response = await axios.get('http://localhost:4000/formations/all', { withCredentials: true });
            setFormations(response.data);
         } catch (err) {
            setError("Erreur lors du chargement des formations.");
         } finally {
            setLoading(false);
         }
      };
      fetchFormations();
   }, []);

   return {
      formations,
      setFormations,
      loading,
      error
   }
}

export default UseFormations