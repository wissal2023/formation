// frontend/QrCodeDisplay.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QrCodeDisplay.css';
import axios from 'axios';

const QrCodeDisplay = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(''); // To store the QR code URL
  const [loading, setLoading] = useState(true); // To display a loading state
  const [error, setError] = useState('');  // To handle errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQrCode = async () => {
      const email = localStorage.getItem('userEmail');
      console.log("Email envoyé : ", email);

      if (!email) {
        setError('Aucun email trouvé.');
        setLoading(false);
        return;
      }
      try {
          // Make the API call to generate the QR code
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/otp/generate-secret`, { params: { email } });
          console.log("Réponse du backend : ", response.data);
  
          if (response.status === 200 && response.data.qrCodeUrl) {
            setQrCodeUrl(response.data.qrCodeUrl);  // Store the QR code URL
            setLoading(false);
          } else {
            setError('Erreur lors de la génération du QR Code.');
            setLoading(false);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du QR Code', error);
          setError('Erreur de connexion au serveur.');
          setLoading(false);
        }
      };

    fetchQrCode();
  }, []);

  const handleContinue = () => {
    navigate('/otp-verification');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src="/logo.png" alt="Logo" className="logo" />
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
    </div>
  );
};

export default QrCodeDisplay;
