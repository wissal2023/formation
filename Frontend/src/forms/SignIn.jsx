import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

<<<<<<< HEAD
// Validation schema for the form
const schema = yup
  .object({
    email: yup.string().required("Email requis").email("Format invalide"),
    password: yup.string().required("Mot de passe requis"),
  })
  .required();
=======
// Validation avec Yup
const schema = yup.object({
  email: yup.string().required("Email requis").email("Format invalide"),
  password: yup.string().required("Mot de passe requis"),
}).required();
>>>>>>> ff98b09c543b0841982ac6c6453ff4b7b82e3c6e

const signIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        email: data.email,
        mdp: data.password,
<<<<<<< HEAD
      }, { withCredentials: true });

      if (response.status === 200) {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('roleUtilisateur', response.data.roleUtilisateur);
        localStorage.setItem('data',JSON.stringify( response.data));

        toast.success("Connexion réussie", { position: 'top-center' });

        if (response.data.mustUpdatePassword) {
=======
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const { username, roleUtilisateur, mustUpdatePassword } = response.data;

        toast.success("Connexion réussie", { position: 'top-center' });

        if (mustUpdatePassword) {
>>>>>>> ff98b09c543b0841982ac6c6453ff4b7b82e3c6e
          navigate('/change-password');
          return;
        }

<<<<<<< HEAD
        navigate('/welcome');
=======
        navigate('/ResetPassword');
>>>>>>> ff98b09c543b0841982ac6c6453ff4b7b82e3c6e
      }
    } catch (error) {
      console.error('Erreur login:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message, { position: 'top-center' });
      } else {
        toast.error("Erreur serveur ou réseau.", { position: 'top-center' });
      }
    }

<<<<<<< HEAD
    reset();  // Reset form fields after submit
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src="assets/img/logo/Image2.png" alt="Logo" className="logo" />
        <h2 className="title">Teamwill</h2>
        <h3 className="subtitle">CONNEXION</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <FaUser className="icon" />
            <input type="text" placeholder="Email" {...register("email")} />
          </div>
          {errors.email && <p className="form_error">{errors.email.message}</p>}
=======
    reset();
  };

  const currentEmail = watch("email");

  return (
    <div className="login-container">
      <img src="assets/img/logo/Image2.png" alt="Logo" className="logo" />
      <h2 className="title">Teamwill</h2>
      <h3 className="subtitle">CONNEXION</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <FaUser className="icon" />
          <input type="text" placeholder="Email" {...register("email")} />
        </div>
        {errors.email && <p className="form_error">{errors.email.message}</p>}
>>>>>>> ff98b09c543b0841982ac6c6453ff4b7b82e3c6e

        <div className="input-group">
          {passwordVisible ? (
            <FaEyeSlash className="icon" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
          ) : (
            <FaEye className="icon" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
          )}
          <input type={passwordVisible ? 'text' : 'password'} placeholder="Mot de passe" {...register("password")} />
        </div>
        {errors.password && <p className="form_error">{errors.password.message}</p>}

<<<<<<< HEAD
          <button type="submit" className="submit-btn">Valider</button>
        </form>

        <span className="forgot-password" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          Mot de passe oublié
        </span>
      </div>
=======
        <button type="submit" className="submit-btn">Valider</button>
      </form>

      <span
        className="forgot-password"
        style={{ opacity: 1, cursor: 'pointer', color: '#007BFF' }}
        onClick={() => navigate('/forgot-password', { state: { email: currentEmail } })}
      >
        Mot de passe oublié ?
      </span>
>>>>>>> ff98b09c543b0841982ac6c6453ff4b7b82e3c6e
    </div>
  );
};

<<<<<<< HEAD
export default signIn;
=======
export default SignIn;
>>>>>>> ff98b09c543b0841982ac6c6453ff4b7b82e3c6e
