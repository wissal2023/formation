
import DashboardLayout from '../layouts/DashboardLayout';
import InstructorHome from '../dashboard/instructor-dashboard/dashboard-home/DashboardHomeArea';

const InstructorDashboard = () => {
   
   return (
      <DashboardLayout pageTitle="Formateur Dashboard">
         <InstructorHome />
      </DashboardLayout>
   );
};

export default InstructorDashboard;