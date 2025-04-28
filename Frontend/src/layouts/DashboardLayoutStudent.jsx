import ChatWidget from "../components/chat/ChatWidget";
import BreadcrumbOne from "../components/common/breadcrumb/BreadcrumbOne";
import SEO from "../components/SEO";
import DashboardBannerTwo from "../dashboard/dashboard-common/DashboardBannerTwo";
import DashboardSidebarTwo from "../dashboard/dashboard-common/DashboardSidebarTwo";
import FooterOne from "./footers/FooterOne";
import HeaderFour from "./headers/HeaderFour";
import Wrapper from "./Wrapper";


const DashboardLayoutStudent = ({ pageTitle, children }) => {
  return (
    <Wrapper>
      <SEO pageTitle={pageTitle} />
      <HeaderFour />
      <main className="main-area fix">
        <BreadcrumbOne />
        <section className="dashboard__area section-pb-120">
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
        <ChatWidget />
      </main>
      <FooterOne />
    </Wrapper>
  );
};

export default DashboardLayoutStudent;
