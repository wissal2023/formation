// src/pages/WelcomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import WelcomePopup from '../components/WelcomePopup/WelcomePopup';
import axios from 'axios';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchLoggedInUser  = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/getOnce`, {
          withCredentials: true,
        });

        setUsername(response.data.username);
        setRole(response.data.roleUtilisateur); 

        console.log("Email récupéré depuis le token:", response.data.email);
        console.log("Rôle récupéré depuis le token:", response.data.roleUtilisateur);
      } catch (error) {
        console.error("Erreur de récupération de l'utilisateur:", error);
        toast.error("Erreur d'authentification. Veuillez vous reconnecter.", {
          position: 'top-center',
        });
        navigate('/signin');
      }
    };

    fetchLoggedInUser ();
  }, [navigate]);

  const handleNavigation = () => {
    if (role === 'Formateur' || role === 'Admin') {
      navigate('/dashboard');
    } else if (role === 'Apprenant') {
      navigate('/student-dashboard');
    } else {
      toast.error('Rôle inconnu. Veuillez contacter le support.', { position: 'top-center' });
      navigate('/signin');
    }
  };

  return (
    <WelcomePopup
      username={username}
      onClose={handleNavigation}
    />
  );
};

export default WelcomePage;
