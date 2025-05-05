import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const QrCodeDisplay = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(10);
  const [expiredMessage, setExpiredMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [qrCodeUrl, setQrCodeUrl] = useState(location.state?.qrCodeUrl || '');
  const [secret, setSecret] = useState(location.state?.secret || '');
  const [showQr, setShowQr] = useState(true);

  useEffect(() => {
    if (showQr) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          console.log("Countdown:", prev); // Log the countdown
          if (prev <= 1) {
            clearInterval(timer);
            setShowQr(false);
            setExpiredMessage("🔒 Le QR Code a expiré. Redirection en cours...");
            setTimeout(() => navigate('/signin'), 5000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }
  }, [showQr, navigate]);

  useEffect(() => {
    console.log("Location state:", location.state); // Log the state
    if (!qrCodeUrl || !secret) {
      setShowQr(false);
      setExpiredMessage("QR Code invalide ou expiré.");
      setTimeout(() => navigate('/signin'), 5000);
    }
    console.log("Location state:", location.state);

  }, [qrCodeUrl, secret, navigate]);

  const handleContinue = () => {
    navigate('/verify-qrcode');
  };

  return (
    <div className="login-container">
      <img src="assets/img/logo/Image2.png" alt="Logo" className="logo" />
      <h2 className="title">Teamwill</h2>
      <h3 className="subtitle">SCANNER LE QR CODE</h3>
      <p className="instruction" style={{ color: 'white', marginBottom: '20px' }}>
        Veuillez scanner le QR Code avec votre application d’authentification.
      </p>

      {showQr && qrCodeUrl ? (
        <>
          <img src={qrCodeUrl} alt="QR Code" className="qr-img" />
          <p style={{ color: 'white', marginTop: '10px' }}>
            ⏳ Le QR Code expirera dans <strong>{countdown}</strong> secondes.
          </p>
        </>
      ) : (
        <p style={{ color: 'white' }}>{expiredMessage || '⛔ QR Code expiré.'}</p>
      )}

      <div className="buttons">
        {showQr && (
          <button className="submit-btn" onClick={handleContinue}>
            Continuer
          </button>
        )}
        <a href="/signin" className="forgot-password">Retour à la connexion</a>
      </div>
    </div>
  );
};

export default QrCodeDisplay;