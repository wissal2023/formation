// frontend/QrCodeDisplay.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QrCodeDisplay = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(''); // To store the QR code URL
  const [loading, setLoading] = useState(true); // To display a loading state
  const [error, setError] = useState('');  // To handle errors
  const navigate = useNavigate();
  const [secret, setSecret] = useState('');


  useEffect(() => {
    const fetchQrCode = async () => {
      try {

        // Step 1: get user info (email) from backend using cookies
        const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users/auth`, {
          withCredentials: true,
        });
        
        const userEmail = userResponse.data.email;
        console.log("Email from cookie/token:", userEmail);

        // Step 2: Call the QR code generation endpoint 
        const qrResponse = await axios.get(`${import.meta.env.VITE_API_URL}/otp/generate-secret`, {
          withCredentials: true,
        });

        
        if (qrResponse.status === 200 && qrResponse.data.qrCodeUrl) {
          setQrCodeUrl(qrResponse.data.qrCodeUrl);
          if (qrResponse.data.secret) {
            setSecret(qrResponse.data.secret);
          }
        } else {
          setError('Erreur lors de la génération du QR Code.');
        }
      
      } catch (err) {
        console.error("Erreur QR:", err);
        setError("Erreur de connexion au serveur ou utilisateur non authentifié.");
      } finally {
        setLoading(false);
      }
    };

    fetchQrCode();
  }, []);

  const handleContinue = () => {
    navigate('/otpverification');
  };

  return (
      <div className="login-container">
        <img src="assets/img/logo/Image2.png" alt="Logo" className="logo" />
        <h2 className="title">Teamwill</h2>
        <h3 className="subtitle">SCANNER LE QR CODE</h3>
        <p className="instruction" style={{ color: 'white', marginBottom: '20px' }}>
          Veuillez scanner le QR Code avec votre application d’authentification.
        </p>

        {loading ? (
          <div className="qr-loader">Chargement...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : qrCodeUrl ? (
          <img src={qrCodeUrl} alt="QR Code" className="qr-img" />
        ) : (
          <div className="qr-loader">QR Code non disponible</div>
        )}

        <div className="buttons">
          <button className="submit-btn" onClick={handleContinue}>
            Continuer
          </button>
          <a href="/signin" className="forgot-password">Retour à la connexion</a>
        </div>
      </div>
  );
};

export default QrCodeDisplay;
