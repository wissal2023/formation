
import DashboardCourse from "../../dashboard-common/DashboardCourse";
import DashboardCounter from "./DashboardCounter";
import DashboardReviewTable from "./DashboardReviewTable";
import BtnArrow from "../../../svg/BtnArrow";
import { Link } from "react-router-dom";

const DashboardHomeArea = () => {

   return (
      <div className="col-lg-9">                     
         <div className="dashboard__count-wrap">
            <div className="dashboard__content-title">
               <h4 className="title">Dashboard</h4>
            </div>
            <div className="row">
               <DashboardCounter />
            </div>
         </div>         
         <DashboardCourse />
          {/* 
         <div className="dashboard__content-wrap">
            <div className="dashboard__content-title">
               <h4 className="title">My users</h4>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="dashboard__review-table">
                     <DashboardReviewTable />
                  </div>
               </div>
            </div>
            <div className="load-more-btn text-center mt-20">
               <Link to="#" className="link-btn">Browse All Course <BtnArrow /></Link>
            </div>
         </div>
         */}
      </div>
   );
};

export default DashboardHomeArea;
