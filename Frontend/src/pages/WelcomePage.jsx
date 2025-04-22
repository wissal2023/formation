// src/pages/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import WelcomePopup from '../components/WelcomePopup/WelcomePopup';

const WelcomePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('roleUtilisateur');

  const handleNavigation = () => {
    if (role === 'Formateur' || role === 'Admin') {
      navigate('/instructor-dashboard');
    } else if (role === 'Apprenant') {
      navigate('/student-dashboard');
    } else {
      toast.error('Unknown role. Please contact support.', { position: 'top-center' });
      navigate('/login');
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
