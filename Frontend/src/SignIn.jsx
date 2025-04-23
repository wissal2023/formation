import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: login, mdp: password }),
      });

      const result = await response.json();

      if (response.ok && result.user) {
        // Stockage dans le localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', result.user.email);
        // Redirection vers la page de reset du mot de passe
        navigate('/ResetPassword');
      } else {
        alert(result.message || 'Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      alert("Une erreur s'est produite lors de la connexion.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src="/Users/ons/Desktop/giiit-baaack/formation/Frontend/public/assets/img/logo/Image2.png" alt="Logo" className="logo" />
        <h2 className="title">Teamwill</h2>
        <h3 className="subtitle">CONNEXION</h3>

        <button className="microsoft-btn">
          <img src="https://img.icons8.com/color/48/000000/microsoft.png" alt="Microsoft" width="20" />
          Se connecter avec Microsoft
        </button>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaEye
              className="icon"
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            />
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">Valider</button>
        </form>

        {/* Lien désactivé, car on ne veut pas qu'il redirige */}
        <span className="forgot-password" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          Mot de passe oublié
        </span>
      </div>
    </div>
  );
};

export default SignIn;