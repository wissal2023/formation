// import React, { useState } from 'react';
// import './Login.css';
// import { FaUser, FaEye } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const SignIn = () => {
//   const [login, setLogin] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (login === 'admin' && password === 'admin123') {
//       localStorage.setItem('isLoggedIn', 'true');
//       navigate('/blog');
//     } else {
//       alert('Identifiants incorrects');
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-container">
//         <img src="/logo.png" alt="Logo" className="logo" />
//         <h2 className="title">Teamwill</h2>
//         <h3 className="subtitle">CONNEXION</h3>

//         <button className="microsoft-btn">
//           <img src="https://img.icons8.com/color/48/000000/microsoft.png" alt="Microsoft" width="20" />
//           Se connecter avec Microsoft
//         </button>

//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <FaUser className="icon" />
//             <input
//               type="text"
//               placeholder="Login"
//               value={login}
//               onChange={(e) => setLogin(e.target.value)}
//             />
//           </div>

//           <div className="input-group">
//             <FaEye className="icon" />
//             <input
//               type="password"
//               placeholder="Mot de passe"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button type="submit" className="submit-btn">Valider</button>
//         </form>

//         <a href="#" className="forgot-password">Mot de passe oublié</a>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic validation
    if (!login || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Mock authentication (replace with actual API call)
    if (login === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/blog');
    } else {
      alert('Identifiants incorrects');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src="/logo.png" alt="Logo" className="logo" />
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

        <a href="#" className="forgot-password">Mot de passe oublié</a>
      </div>
    </div>
  );
};

export default SignIn;
