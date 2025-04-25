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
    const fetchUserFromToken = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/auth`, {
          withCredentials: true,
        });

        setUsername(response.data.username); // or response.data.username if available
        setRole(response.data.roleUtilisateur); // assuming your backend returns it

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

    fetchUserFromToken();
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
