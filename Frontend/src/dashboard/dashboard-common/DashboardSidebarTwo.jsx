import { color } from "framer-motion";
import React from "react";
import { TbBackground } from "react-icons/tb";
import { Link } from "react-router-dom";

const sidebar_data = [
   {
      id: 1,
      title: "Welcome, Emily Hannah",
      sidebar_details: [
         {
            id: 1,
            link: "/student-dashboard",
            icon: "fas fa-home",
            title: "Dashboard",
         },
         {
            id: 2,
            link: "/profile",
            icon: "skillgro-avatar",
            title: "My Profile",
         },
         {
            id: 3,
            link: "/student-enrolled-courses",
            icon: "skillgro-book",
            title: "Enrolled Courses",
         },
         {
            id: 4,
            link: "/student-wishlist",
            icon: "skillgro-label",
            title: "Wishlist",
         },
         {
            id: 5,
            link: "/student-review",
            icon: "skillgro-book-2",
            title: "Reviews",
         },
         {
            id: 6,
            link: "/student-attempts",
            icon: "skillgro-question",
            title: "My Quiz Attempts",
         },
         {
            id: 7,
            link: "/student-history",
            icon: "skillgro-satchel",
            title: "Order History",
         },
      ],
   },
   {
      id: 2,
      title: "User",
      class_name: "mt-30",
      sidebar_details: [
         {
            id: 1,
            link: "/student-setting",
            icon: "skillgro-settings",
            title: "Settings",
         },
         {
            id: 2,
            link: "/",
            icon: "skillgro-logout",
            title: "Logout",
         },
      ],
   },
];

const DashboardSidebarTwo = () => {
   return (
      <div className="col-lg-3">
         <h1 style={{color : "red" }}>hello</h1>
         <div className="dashboard__sidebar-wrap">
            {sidebar_data.map((item) => (
               <React.Fragment key={item.id}>
                  <div className={`dashboard__sidebar-title mb-20 ${item.class_name || ""}`}>
                     <h6 className="title">{item.title}</h6>
                  </div>
                  <nav className="dashboard__sidebar-menu">
                     <ul className="list-wrap">
                        {item.sidebar_details.map((list) => (
                           <li key={list.id}>
                              <Link to={list.link}>
                                 <i className={list.icon}></i>
                                 {list.title}
                              </Link>
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

export default DashboardSidebarTwo;
