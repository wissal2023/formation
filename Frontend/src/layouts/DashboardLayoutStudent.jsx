<<<<<<< HEAD
import ChatWidget from "../components/chat/ChatWidget";
=======
// src/layouts/DashboardLayoutStudent.jsx

>>>>>>> ab0c1cbdfb0bdd0c396fb2c8dc66eb8166371774
import BreadcrumbOne from "../components/common/breadcrumb/BreadcrumbOne";
import SEO from "../components/SEO";
import DashboardBannerTwo from "../dashboard/dashboard-common/DashboardBannerTwo";
import DashboardSidebarTwo from "../dashboard/dashboard-common/DashboardSidebarTwo";
import FooterOne from "./footers/FooterOne";
import HeaderFour from "./headers/HeaderFour";
import Wrapper from "./Wrapper";
<<<<<<< HEAD

=======
import ChatWidget from '../components/chat/ChatWidget';
>>>>>>> ab0c1cbdfb0bdd0c396fb2c8dc66eb8166371774

const DashboardLayoutStudent = ({ pageTitle, children }) => {
  return (
    <Wrapper>
      <SEO pageTitle={pageTitle} />
      <HeaderFour />
      <main className="main-area fix">
        <BreadcrumbOne />
        <section className="dashboard__area section-pb-120">
<<<<<<< HEAD
          <div className="container">
            <DashboardBannerTwo />
            <div className="dashboard__inner-wrap">
              <div className="row">
                <DashboardSidebarTwo />
                  {children}
              </div>
            </div>
          </div>
        </section>
=======
         <div className="container">
            <DashboardBannerTwo />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebarTwo />
                  <div className="col-lg-9">
                     {children}                    
                  </div>
               </div>
            </div>
         </div>
      </section>
>>>>>>> ab0c1cbdfb0bdd0c396fb2c8dc66eb8166371774
        <ChatWidget />
      </main>
      <FooterOne />
    </Wrapper>
  );
};

export default DashboardLayoutStudent;
