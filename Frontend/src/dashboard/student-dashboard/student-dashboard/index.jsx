import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import DashboardLayout from '../../../layouts/DashboardLayout'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderOne from '../../../layouts/headers/HeaderOne'
import StudentDashboardArea from './StudentDashboardArea'

const StudentDashboard = () => {
   return (
      <>


         <DashboardLayout>
            <StudentDashboardArea />
         </DashboardLayout>
      </>

   )
}

export default StudentDashboard
