import InstructorProfileContent from '../dashboard/instructor-dashboard/profile/InstructorProfileContent';
import DashboardLayoutStudent from '../layouts/DashboardLayoutStudent';

const StudentProfile = () => {
   return (
      <DashboardLayoutStudent pageTitle="edit profile">
         <InstructorProfileContent />
      </DashboardLayoutStudent>
   );
};

export default StudentProfile;