import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const sidebar_data = [
   {
      id: 1,
      title: "Welcome",
      sidebar_details: [
         { id: 1, link: "/dashboard", icon: "fas fa-home", title: "Dashboard" },
         { id: 2, link: "/listUsers", icon: "skillgro-avatar", title: "All Users" },
         { id: 3, link: "/formations", icon: "skillgro-book", title: "All Formation" },
         { id: 4, link: "/stepper", icon: "skillgro-label", title: "Create formation stepper" },
         { id: 5, link: "/convert", icon: "skillgro-book-2", title: "generator" },
         { id: 6, link: "/instructor-attempts", icon: "skillgro-question", title: "My Quiz Attempts" },
         { id: 7, link: "/instructor-history", icon: "skillgro-satchel", title: "Order History" },
      ],
   },
   {
      id: 2,
      title: "INSTRUCTOR",
      class_name: "mt-40",
      sidebar_details: [
         { id: 1, link: "/instructor-courses", icon: "skillgro-video-tutorial", title: "My Courses" },
         { id: 2, link: "/instructor-announcement", icon: "skillgro-marketing", title: "Announcements" },
         { id: 3, link: "/instructor-quiz", icon: "skillgro-chat", title: "Quiz Attempts" },
         { id: 4, link: "/instructor-assignment", icon: "skillgro-list", title: "Assignments" },
      ],
   },
   {
      id: 3,
      title: "User",
      class_name: "mt-30",
      sidebar_details: [
         { id: 1, link: "/instructor-setting", icon: "skillgro-settings", title: "Settings" },
         { id: 2, link: "/logout", icon: "skillgro-logout", title: "Logout" },
      ],
   },
];

const DashboardSidebar = () => {
   const navigate = useNavigate();

   const handleLogout = async (e) => {
      e.preventDefault(); // Prevent navigation
      try {
         await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {}, { withCredentials: true }); // Adjust the endpoint if needed
         navigate("/signin");
      } catch (error) {
         console.error("Erreur lors de la déconnexion:", error.message);
      }
   };

   return (
      <div className="col-lg-3">
         <div className="dashboard__sidebar-wrap">
            {sidebar_data.map((item) => (
               <React.Fragment key={item.id}>
                  <div className={`dashboard__sidebar-title mb-20 ${item.class_name}`}>
                     <h6 className="title">{item.title}</h6>
                  </div>
                  <nav className="dashboard__sidebar-menu">
                     <ul className="list-wrap">
                        {item.sidebar_details.map((list) => (
                           <li key={list.id}>
                              {list.title === "Logout" ? (
                                 <a href="/logout" onClick={handleLogout}>
                                    <i className={list.icon}></i>
                                    {list.title}
                                 </a>
                              ) : (
                                 <Link to={list.link}>
                                    <i className={list.icon}></i>
                                    {list.title}
                                 </Link>
                              )}
                           </li>
                        ))}
                     </ul>
                  </nav>
               </React.Fragment>
            ))}
         </div>
      </div>
   );
};

export default DashboardSidebar;
