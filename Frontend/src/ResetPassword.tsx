import React, { useState } from 'react';
import './Login.css'; // Réutilise ton style de login
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaQrcode } from 'react-icons/fa';

const ResetPassword = () => {
  const [method, setMethod] = useState<'email' | 'qrcode'>('email');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (method === 'email') {
      navigate('/otp-verification'); // Redirection vers saisie OTP
    } else {
      navigate('/qr-verification'); // Redirection vers scan QR
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">

        <p className="subtitle">Comment voulez-vous recevoir votre code  ?</p>

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

        <div className="user-info">
          <div>
          </div>
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
