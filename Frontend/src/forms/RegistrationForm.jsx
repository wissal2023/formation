import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from '../svg/BtnArrow';
import axios from 'axios';
import { USER_ROLES } from "../constants/roles";

// Validation schema
const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    roleUtilisateur: yup.string()
      .oneOf(USER_ROLES, "Choose a valid role")
      .required("Role is required"),
}).required();

const RegistrationForm = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ resolver: yupResolver(schema) });

   
   const onSubmit = async (data) => {
      try {
       
        // Send data without the password field (mdp is generated on the backend)
        const response = await axios.post('http://localhost:4000/users/register', {
          username: data.username,
          email: data.email,
          roleUtilisateur: data.roleUtilisateur,
        }, {
          withCredentials: true,
        });
        
  
        toast.success(response.data.message || "User created successfully!", { position: 'top-center' });
        reset();
  
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.error || "Registration failed", { position: 'top-center' });
      }
    };

    return (
      <div className="instructor__profile-form-wrap">
        <form onSubmit={handleSubmit(onSubmit)} className="instructor__profile-form">
          <div className="form-grp">
            <label htmlFor="username">Username</label>
            <input type="text" {...register("username")} id="username" placeholder="Username" />
            <p className="form_error">{errors.username?.message}</p>
          </div>
    
          <div className="form-grp">
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} id="email" placeholder="Email" />
            <p className="form_error">{errors.email?.message}</p>
          </div>        
    
          <div className="form-grp select">
            <label htmlFor="roleUtilisateur">Role</label>
            <select {...register("roleUtilisateur")} id="roleUtilisateur">
              <option value="">-- choose the Role --</option>
              {USER_ROLES.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <p className="form_error">{errors.roleUtilisateur?.message}</p>
          </div>
    
          <button type="submit" className="btn btn-two arrow-btn">
            Register  <BtnArrow />
          </button>
        </form>
      </div>
    );
};

export default RegistrationForm;
