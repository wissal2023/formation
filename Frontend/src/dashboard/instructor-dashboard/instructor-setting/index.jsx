import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderFour from '../../../layouts/headers/HeaderFour'
import InstructorSettingArea from './InstructorSettingArea'

const InstructorSetting = () => {
   return (
      <>
         <HeaderFour />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <InstructorSettingArea />
         </main>
         <FooterOne />
      </>
   )
}

export default InstructorSetting
