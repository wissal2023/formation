import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from '../svg/BtnArrow';

// Optional: Describe the fields expected in comments if needed
// const defaultValues = { fname: '', lname: '', email: '', password: '', cpassword: '' };

const schema = yup
   .object({
      fname: yup.string().required("First name is required"),
      lname: yup.string().required("Last name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
      cpassword: yup.string().required("Password confirmation is required"),
   })
   .required();

const RegistrationForm = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ resolver: yupResolver(schema) });

   const onSubmit = () => {
      toast('Registration successfully', { position: 'top-center' });
      reset();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="account__form">
         <div className="row gutter-20">
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="fast-name">First Name</label>
                  <input type="text" {...register("fname")} id="fast-name" placeholder="First Name" />
                  <p className="form_error">{errors.fname?.message}</p>
               </div>
            </div>
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="last-name">Last name</label>
                  <input type="text" {...register("lname")} id="last-name" placeholder="Last name" />
                  <p className="form_error">{errors.lname?.message}</p>
               </div>
            </div>
         </div>
         <div className="form-grp">
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} id="email" placeholder="email" />
            <p className="form_error">{errors.email?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="password">Password</label>
            <input type="password" {...register("password")} id="password" placeholder="password" />
            <p className="form_error">{errors.password?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" {...register("cpassword")} id="confirm-password" placeholder="Confirm Password" />
            <p className="form_error">{errors.cpassword?.message}</p>
         </div>
         <button type="submit" className="btn btn-two arrow-btn">
            Sign Up <BtnArrow />
         </button>
      </form>
   );
};

export default RegistrationForm;
