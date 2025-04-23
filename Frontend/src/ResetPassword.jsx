import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaQrcode } from 'react-icons/fa';

const ResetPassword = () => {
  const [method, setMethod] = useState('email');
  const navigate = useNavigate();

  const handleContinue = async () => {
    const email = localStorage.getItem('userEmail') || 'devtest25@gmail.com';
    localStorage.setItem('userEmail', email);

    if (method === 'email') {
      try {
        const response = await fetch('http://localhost:3000/otp/generate-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          navigate("/otpverification");
        } else {
          alert("Erreur lors de l'envoi de l'OTP.");
        }
      } catch (error) {
        console.error('Erreur de connexion:', error);
        alert('Erreur de connexion au serveur.');
      }

    } else if (method === 'qrcode') {
      try {
        const response = await fetch('http://localhost:3000/otp/generate-secret', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        });

        if (response.ok) {
          navigate("/qrcodedisplay");
        } else {
          alert('Erreur lors de la génération du QR Code');
        }
      } catch (error) {
        console.error('Erreur lors de la génération du QR Code', error);
        alert('Erreur de connexion au serveur.');
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <p className="subtitle">Comment voulez-vous recevoir votre code ?</p>

        <div className="option-group">
          <label className="option">
            <input
              type="radio"
              name="method"
              value="email"
              checked={method === 'email'}
              onChange={() => setMethod('email')}
            />
            <FaEnvelope className="icon" />
            <span>Utiliser mon e-mail</span>
          </label>

          <label className="option">
            <input
              type="radio"
              name="method"
              value="qrcode"
              checked={method === 'qrcode'}
              onChange={() => setMethod('qrcode')}
            />
            <FaQrcode className="icon" />
            <span>Utiliser un QR Code</span>
          </label>
        </div>

        <div className="buttons">
          <a href="#" className="forgot-password">Vous n’avez plus accès à ces éléments ?</a>
          <button className="submit-btn" onClick={handleContinue}>Continuer</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;