// ../../../forms/LoginForm.jsx
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from '../svg/BtnArrow';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const schema = yup
   .object({
      email: yup.string().required("Email is required").email("Invalid email format"),
      password: yup.string().required("Password is required"),
   })
   .required();

const LoginForm = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ resolver: yupResolver(schema) });

   const navigate = useNavigate();

   const onSubmit = async (data) => {
      try {
         const response = await axios.post('http://localhost:3000/users/login', {
            email: data.email,
            mdp: data.password,
         });

         if (response.status === 200) {
            const { token, roleUtilisateur, userId } = response.data;

            toast.success('Login successful', { position: 'top-center' });

            // Store token and user info
            localStorage.setItem('authToken', token);
            localStorage.setItem('roleUtilisateur', roleUtilisateur);
            localStorage.setItem('userId', userId);

            // Redirect based on role
            if (roleUtilisateur === 'Formateur' || roleUtilisateur === 'Admin') {
               navigate('/instructor-dashboard');
            } else if (roleUtilisateur === 'Apprenant') {
               navigate('/student-dashboard');
            } else {
               toast.error('Unknown role. Please contact support.', { position: 'top-center' });
            }
         }
      } catch (error) {
         console.error('Login error:', error);
         toast.error('Login failed. Please check your credentials.', { position: 'top-center' });
      }

      reset();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="account__form">
         <div className="form-grp">
            <label htmlFor="email">Email</label>
            <input id="email" {...register("email")} type="text" placeholder="email" />
            <p className="form_error">{errors.email?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="password">Password</label>
            <input id="password" {...register("password")} type="password" placeholder="password" />
            <p className="form_error">{errors.password?.message}</p>
         </div>
         <div className="account__check">
            <div className="account__check-remember">
               <input type="checkbox" className="form-check-input" value="" id="terms-check" />
               <label htmlFor="terms-check" className="form-check-label">Remember me</label>
            </div>
            <div className="account__check-forgot">
               <Link to="/registration">Forgot Password?</Link>
            </div>
         </div>
         <button type="submit" className="btn btn-two arrow-btn">
            Sign In <BtnArrow />
         </button>
      </form>
   );
};

export default LoginForm;
