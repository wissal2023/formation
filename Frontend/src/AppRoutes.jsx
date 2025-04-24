import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import OTPVerification from './OtpVerification';
import ResetPassword from './ResetPassword';
import QrCodeDisplay from './QrCodeDisplay';
import Home from './pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/OtpVerification" element={<OTPVerification />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/qrcodedisplay" element={<QrCodeDisplay />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;