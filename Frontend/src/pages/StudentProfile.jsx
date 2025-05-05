import InstructorProfileContent from '../dashboard/instructor-dashboard/profile/InstructorProfileContent';
import DashboardLayoutStudent from '../layouts/DashboardLayoutStudent';

const StudentProfile = () => {
   return (
      <DashboardLayoutStudent pageTitle="edit profile">
         <InstructorProfileContent style={true} />
      </DashboardLayoutStudent>
   );
};

export default StudentProfile;