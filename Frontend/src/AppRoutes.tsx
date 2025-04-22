// src/routes/AppRoutes.tsx

import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import OTPVerification from './OTPVerification';
import ResetPassword from './ResetPassword';
import QrCodeDisplay from './QrCodeDisplay';
const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<SignIn />} />
      <Route path="/" element={<OTPVerification />} />
      <Route path="/OTPverifiaction" element={<OTPVerification />} />
<Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/Signin" element={<SignIn />} />
      <Route path="/QrCodeDisplay" element={<QrCodeDisplay />} />
    </Routes>
  );
};

export default AppRoutes;
