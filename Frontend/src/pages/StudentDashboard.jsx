import StudentDashboardArea from '../dashboard/student-dashboard/student-dashboard/StudentDashboardArea';
import DashboardLayoutStudent from '../layouts/DashboardLayoutStudent';

const StudentDashboard = () => {
   return (
      <DashboardLayoutStudent pageTitle="apprenant Dashboard">
        <StudentDashboardArea /> 
      </DashboardLayoutStudent>
     
   );
};

export default StudentDashboard;