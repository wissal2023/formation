import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../layouts/Wrapper';
import LessonMain from '../components/courses/lesson';
import SEO from '../components/SEO';

const Lesson = () => {
   const { id } = useParams(); // Assuming your route is like /lesson/:id
   const [title, setTitle] = useState('Lesson');
   const [filename, setFilename] = useState(''); // Make sure to store the filename here

   useEffect(() => {
      const API = import.meta.env.VITE_API_URL;
      if (id) {
         axios.get(`${API}/documents/byFormation/${id}`, { withCredentials: true })
            .then(res => {
               if (res.data?.titre) setTitle(res.data.titre);
               if (res.data?.filename) setFilename(res.data.filename); // Store filename here
            })
            .catch(err => {
               console.error('Erreur lors de la récupération de la formation:', err);
            });
      }
   }, [id]);

   return (
      <Wrapper>
         <SEO pageTitle={title} />
         <LessonMain lessonId={id} filename={filename} /> {/* Pass the filename here */}
      </Wrapper>
   );
};

export default Lesson;
