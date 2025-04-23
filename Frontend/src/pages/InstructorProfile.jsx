import DashboardReviewTable from "../dashboard/instructor-dashboard/dashboard-home/DashboardReviewTable"
import DashboardLayout from '../layouts/DashboardLayout';

const InstructorProfile = () => {
   return (
     <DashboardLayout pageTitle="edit users">
      {/**       <InstructorProfileContent />
 */}
      <DashboardReviewTable />
     </DashboardLayout>
   );
};

export default InstructorProfile;