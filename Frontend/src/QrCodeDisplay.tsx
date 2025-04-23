import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QrCodeDisplay.css';

const QrCodeDisplay: React.FC = () => {
  const [qrCodeData, setQrCodeData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/otp/generate-secret');
        const data = await response.json();
        setQrCodeData(data.qrCodeUrl);
      } catch (error) {
        console.error('Erreur lors de la récupération du QR Code', error);
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

        {qrCodeData ? (
  <img src={qrCodeData} alt="QR Code" className="qr-img" />
) : (
  <div className="qr-loader"></div>
)}



        <div className="buttons">
          <button className="submit-btn" onClick={handleContinue}>
            Continuer
          </button>
          <a href="/login" className="forgot-password">Retour à la connexion</a>
        </div>
      </div>
    </div>
  );
};

export default QrCodeDisplay;
