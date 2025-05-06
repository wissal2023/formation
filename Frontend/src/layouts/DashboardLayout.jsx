// src/layouts/DashboardLayout.jsx
import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import HeaderFour from '../layouts/headers/HeaderFour';
import Breadcrumb from '../components/common/breadcrumb/DashboardBreadcrumb';
import FooterOne from '../layouts/footers/FooterOne';
import DashboardBanner from "../dashboard/dashboard-common/DashboardBanner";
import DashboardSidebar from "../dashboard/dashboard-common/DashboardSidebar";
import ChatWidget from '../components/chat/ChatWidget';
import './LoginLayout.css'

const DashboardLayout = ({ pageTitle, children }) => {
  return (
    <Wrapper>
      <SEO pageTitle={pageTitle} />
      <HeaderFour />
      <main className="main-area fix">
        <Breadcrumb />
        <section className="dashboard__area section-pb-120">
          <div className="container">
            <DashboardBanner />
            <div className="dashboard__inner-wrap">
              <div className="row">
                <DashboardSidebar />
                  {children}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterOne />
    </Wrapper>
  );
};

export default DashboardLayout;
