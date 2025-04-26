import { useEffect, useState } from "react";
import axios from "axios";
import { USER_ROLES } from "../../../constants/roles";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const UserSettingProfile = ({ userId , style }) => {

   const navigate = useNavigate(); 
   const [user, setUser] = useState(null);
   const [formValues, setFormValues] = useState({
      username: "",
      roleUtilisateur: "",
      tel: "",
      isActive: false,
      photo: null
    });
   
    useEffect(() => {
      if (userId) {
        axios
         .get(`${import.meta.env.VITE_API_URL}/users/getById/${userId}`, {
            withCredentials: true,})
         .then((res) => {
            console.log(res.data);  // Log the response to confirm that 'tel' is being returned
            setUser(res.data);
            setFormValues({
              username: res.data.username,
              roleUtilisateur: res.data.roleUtilisateur,
              tel: res.data.tel || "",  // Ensure it's not undefined or null
              isActive: res.data.isActive,
              photo: res.data.photo || null,

            });
         }).catch((err) => {
            console.error("Error loading user", err);
          });
      }
    }, [userId]);

   const handleChange = (e) => {
   const { id, value, type, checked, files  } = e.target;
   setFormValues((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
   }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("username", formValues.username);
        formData.append("roleUtilisateur", formValues.roleUtilisateur);
        formData.append("tel", formValues.tel);
        formData.append("isActive", formValues.isActive);
        if (formValues.photo) {
          formData.append("photo", formValues.photo);
        }
  
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/users/edit/${userId}`,formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
    
        toast.success(res.data.message || "User updated successfully!", { position: 'top-center',});
        navigate("/listUsers");
    
      } catch (err) {
        console.error("Failed to update user", err);
        toast.error(err.response?.data?.error || "Update failed", { position: 'top-center',});
      }
    };
    
  
    if (!user) return <p>Loading...</p>;

   return (
      <>
         {style && (
            <div className="instructor__cover-bg">
               <div className="instructor__cover-info">
                  <div className="instructor__cover-info-left">
                     <div className="thumb">
                     <img src={user.photo ? 
                        `${import.meta.env.VITE_API_URL}${user.photo}` : '/assets/default-avatar.png'}  alt="User"  />
                     </div>
                     <label title="Upload Photo" className="upload-label">
                        <i className="fas fa-camera"></i>
                        <input type="file" id="photo" accept="image/*" onChange={handleChange} hidden />
                     </label>
                  </div>                  
               </div>
            </div>
         )}
         <div className="instructor__profile-form-wrap">
            <form onSubmit={handleSubmit} className="instructor__profile-form">
               <div className="row">
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="firstname">Username</label>
                        <input id="username" type="text" value={formValues.username} onChange={handleChange}/>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="roleUtilisateur">User Role</label>
                        <select id="roleUtilisateur" value={formValues.roleUtilisateur} onChange={handleChange}>
                           <option value="">-- Select a role --</option>
                           {USER_ROLES.map((role) => (
                           <option key={role} value={role}>
                              {role}
                           </option>
                           ))}
                        </select>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="tel">Phone Number</label>
                        <input id="tel" type="text" value={formValues.tel}  onChange={handleChange} />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="isActive">Active Profile</label>
                        <input id="isActive" type="checkbox" checked={formValues.isActive} onChange={handleChange} />
                     </div>
                  </div>  
               </div>
               <div className="submit-btn mt-25">
                  <button type="submit" className="btn">
                     Update User's Info
                  </button>
               </div>
            </form>
         </div>
      </>
   );
};

export default UserSettingProfile;
