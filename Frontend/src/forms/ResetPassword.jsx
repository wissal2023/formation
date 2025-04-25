import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaQrcode } from 'react-icons/fa';
import axios from 'axios';


const ResetPassword = () => {
  const [method, setMethod] = useState('email');
  const navigate = useNavigate();

  const handleContinue = async () => {
    const email = localStorage.getItem('userEmail');
    localStorage.setItem('userEmail', email);

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };

    try {
      if (method === 'email') {
        const response = await axios.post( `${import.meta.env.VITE_API_URL}/otp/generate-otp`,{ email },
          config
        );

        if (response.status === 200) {
          navigate('/otpverification');
        } else {
          alert("Erreur lors de l'envoi de l'OTP.");
        }
      } else if (method === 'qrcode') {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/otp/generate-secret`,{ email },
          config
        );

        if (response.status === 200) {
          navigate('/qrcodedisplay');
        } else {
          alert("Erreur lors de la génération du QR Code.");
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur de connexion au serveur.");
    }
  };

  return (
      <div className="login-container">
        <p className="subtitle">Comment voulez-vous recevoir votre code ?</p>

        <div className="option-group">
          <label className="option">
            <input type="radio" name="method" value="email" checked={method === 'email'}
              onChange={() => setMethod('email')} /> <FaEnvelope className="icon" />
            <span>Utiliser mon e-mail</span>
          </label>

          <label className="option">
            <input type="radio" name="method" value="qrcode" checked={method === 'qrcode'}
              onChange={() => setMethod('qrcode')} /> <FaQrcode className="icon" />
            <span>Utiliser un QR Code</span>
          </label>
        </div>

        <div className="buttons">
          <a href="#" className="forgot-password">Vous n’avez plus accès à ces éléments ?</a>
          <button className="submit-btn" onClick={handleContinue}>Continuer</button>
        </div>
      </div>
  );
};

export default ResetPassword;