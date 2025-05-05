<<<<<<< HEAD
import DashboardLayoutStudent from "../../../layouts/DashboardLayoutStudent"


const StudentDashboardArea = () => {
   return (
<DashboardLayoutStudent pageTitle="dashbord-student">




</DashboardLayoutStudent>

=======
import Count from "../../../components/common/Count"
import dashboard_count_data from "../../../data/dashboard-data/DashboardCounterData"

const StudentDashboardArea = () => {
   return (
      <div className="dashboard__count-wrap">
         <div className="dashboard__content-title">
            <h4 className="title">Dashboard</h4>
         </div>
         <div className="row">
            {dashboard_count_data.slice(0, 3).map((item) => (
               <div key={item.id} className="col-lg-4 col-md-4 col-sm-6">
                  <div className="dashboard__counter-item">
                     <div className="icon">
                        <i className={item.icon}></i>
                     </div>
                     <div className="content">
                        <span className="count"><Count number={item.count} /></span>
                        <p style={{ marginTop:"14px" }}>{item.title}</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
>>>>>>> ab0c1cbdfb0bdd0c396fb2c8dc66eb8166371774
   )
}

export default StudentDashboardArea
