// QRCodeOTPVerification.jsx
import React, { useState, useEffect } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QRCodeVerification = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/auth`, {
          withCredentials: true,
        });
        setEmail(response.data.email);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'email :", error);
        alert("Impossible de récupérer l'e-mail.");
      }
    };

    fetchEmail();
  }, []);

  
  const handleSubmit = async (e) => {
   
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/otp/verifyTotp`, {
        email,
        otp
      }, {
        withCredentials: true
      });
      console.log("✅ Réponse de vérification TOTP:", response.data);
      console.log("📤 Envoi de l'email:", email);
      if (response.status === 200) {
        navigate('/welcome');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la vérification du code';
      alert(message);
    }
  };

  return (
    <div className="login-container">
      <img src="assets/img/logo/Image2.png" alt="Logo" className="logo" />
      <h2 className="title">Teamwill</h2>
      <h3 className="subtitle">VÉRIFICATION PAR QR CODE</h3>

      <p className="text-white text-sm mb-4">
        Veuillez entrer le code généré par votre application d'authentification
        pour <strong>{email}</strong>
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
  );
};

export default QRCodeVerification;