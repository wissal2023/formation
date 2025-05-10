import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../layouts/Wrapper';
import LessonMain from '../components/courses/lesson';
import SEO from '../components/SEO';

const Lesson = () => {
   const { id } = useParams(); // Assuming your route is like /lesson/:id
   const [title, setTitle] = useState(' Lesson');

   useEffect(() => {
      const API = import.meta.env.VITE_API_URL;
      if (id) {
         axios.get(`${API}/formations/${id}`, { withCredentials: true }) // Correct usage of withCredentials
            .then(res => {
               if (res.data?.titre) setTitle(res.data.titre);
            })
            .catch(err => {
               console.error('Erreur lors de la récupération de la formation:', err);
            });
      }
   }, [id]);

   return (
      <Wrapper>
         <SEO pageTitle={title} />
         <LessonMain />
      </Wrapper>
   );
};

export default Lesson;
