import { Link } from "react-router-dom";
import BtnArrow from "../../svg/BtnArrow";
import InjectableSvg from "../../hooks/InjectableSvg";
import { useSelector } from "react-redux";


const DashboardBannerTwo = () => {
         const data = JSON.parse(localStorage.getItem("data"));
         const user = useSelector((state) => state.user);

         console.log('hhhdashboard',`${import.meta.env.VITE_API_URL}/assets/uploads/${data.photo}`);
         

   return (
      <div className="dashboard__top-wrap">
         <div className="dashboard__top-bg" style={{ backgroundImage: "url(/assets/img/bg/student_bg.jpg)" }}></div>
         <div className="dashboard__instructor-info">
            <div className="dashboard__instructor-info-left">
               <div className="thumb">
                  <img src={ data?.photo
                        ? `${import.meta.env.VITE_API_URL}/assets/uploads/${data.photo}`
                        : "assets/img/courses/details_instructors02.jpg"} alt="img" />
               </div>
               <div className="content">
                  <h4 className="title">{data?.username} </h4>
                  <ul className="list-wrap">
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon03.svg" alt="img" className="injectable" />
                        5 Courses Enrolled
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon05.svg" alt="img" className="injectable" />
                        4 Certificates
                     </li>
                  </ul>
               </div>
            </div>
            <div className="dashboard__instructor-info-right">
               <Link to="#" className="btn btn-two arrow-btn">Become an Instructor <BtnArrow /></Link>
            </div>
         </div>
      </div>
   );
}

export default DashboardBannerTwo;
