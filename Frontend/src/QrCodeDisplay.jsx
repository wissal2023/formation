import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QrCodeDisplay.css';

const QrCodeDisplay = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(true); // Pour afficher un loader pendant la récupération
  const [error, setError] = useState('');  // Pour gérer les erreurs
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
        const response = await fetch('http://localhost:3000/otp/generate-secret', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })  // Envoie l'email dynamique
        });

        console.log("Status de la réponse : ", response.status);
        const data = await response.json();
        console.log("Réponse du backend : ", data);

        if (response.ok && data.qrCodeUrl) {
          setQrCodeUrl(data.qrCodeUrl);  // Stocke l'URL du QR Code
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
          <div className="qr-loader">Chargement...</div>  // Affiche un loader pendant le chargement
        ) : error ? (
          <div className="error-message">{error}</div>  // Affiche un message d'erreur si nécessaire
        ) : qrCodeUrl ? (
          <img src={qrCodeUrl} alt="QR Code" className="qr-img" />
        ) : (
          <div className="qr-loader">QR Code non disponible</div>  // Si aucune URL n'est disponible
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