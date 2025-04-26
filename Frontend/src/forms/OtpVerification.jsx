import React, { useState, useEffect } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmailFromToken = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/auth`, {
          withCredentials: true,
        });
        setEmail(response.data.email);
        console.log("Email récupéré depuis le token:", response.data.email);
      } catch (error) {
        console.error("Erreur de récupération de l'utilisateur:", error);
        alert("Impossible de récupérer l'e-mail depuis le token.");
      }
    };

    fetchEmailFromToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert('Veuillez entrer le code OTP');
      return;
    }

    try {
      console.log("Email:", email);
      console.log("OTP:", otp);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/otp/verifyOtp`,
        { email, otp },
        { withCredentials: true }
      );

      console.log("Backend response:", response.data);

      if (response.status === 200) {
        navigate('/welcome');
      }
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Erreur serveur lors de la vérification du code';
      alert(message);
    }
  };

  return (
    <div className="login-container">
      <img src="assets/img/logo/Image2.png" alt="Logo" className="logo" />
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
  );
};

export default OTPVerification;
