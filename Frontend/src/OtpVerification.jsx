import React, { useState } from 'react';
import './Login.css';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem('userEmail'); // 👈 Récupère le vrai email

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert('Veuillez entrer le code OTP');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

    if (response.ok) {
      navigate('/course-details');
    } else {
      alert(result.message || 'Code OTP incorrect');
    }
  } catch (error) {
    console.error(error);
    alert('Erreur serveur lors de la vérification du code');
  }
};
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img
          src="/assets/teamwill.webp"
          alt="Logo"
          className="logo"
        />
        <h2 className="title">Teamwill</h2>
        <h3 className="subtitle">VÉRIFICATION OTP</h3>

        <p className="text-white text-sm mb-4">
          Un code de vérification a été envoyé à <strong>{email}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type={showOtp ? 'text' : 'password'}
              placeholder="Entrez le code OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <span
              onClick={() => setShowOtp(!showOtp)}
              className="icon toggle-icon"
              style={{ cursor: 'pointer' }}
            >
              {showOtp ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="submit-btn">Vérification</button>
        </form>

        <a href="/signin" className="forgot-password">Retour à la connexion</a>
      </div>
    </div>
  );
};

export default OTPVerification;