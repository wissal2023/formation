// pages/Login.jsx
import Wrapper from '../layouts/Wrapper';
import ChangePasswordMain from '../components/inner-pages/change-password';
import SEO from '../components/SEO';

const ChangePassword = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'chanange password page'} />
         <ChangePasswordMain />
      </Wrapper>
   );
};

export default ChangePassword;