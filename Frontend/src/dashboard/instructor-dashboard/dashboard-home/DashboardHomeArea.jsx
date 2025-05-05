
import DashboardCourse from "../../dashboard-common/DashboardCourse";
import DashboardCounter from "./DashboardCounter";
import DashboardReviewTable from "./DashboardReviewTable";
import BtnArrow from "../../../svg/BtnArrow";
import { Link } from "react-router-dom";
import Stats from "./stats";

const DashboardHomeArea = () => {

   return (
      <div className="col-lg-9">                     
         <div className="dashboard__count-wrap">
            <div className="dashboard__content-title">
               <h4 className="title">Dashboard</h4>
            </div>
            <div className="row">
               <Stats />
            </div>
         </div>         
         {/* <DashboardCourse />
         <DashboardReviewTable />*/}

         
      </div>
   );
};

export default DashboardHomeArea;
