import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './redux/store';

import AppNavigation from './navigation/Navigation';
import SignIn from './SignIn';
import OTPVerification from './OtpVerification';
import ResetPassword from './ResetPassword';
import QrCodeDisplay from './QrCodeDisplay';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Provider store={store}>
      <HelmetProvider>
        <Router>
          <Routes>
            {/* Redirection conditionnelle sur la page d'accueil */}
            <Route 
              path="/" 
              element={isLoggedIn ? <Navigate to="/signin" /> : <SignIn />} 
            />

            <Route path="/otpverification" element={<OTPVerification />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/qrcodedisplay" element={<QrCodeDisplay />} />

            {/* Routes protégées par isLoggedIn */}
            <Route 
              path="/*" 
              element={isLoggedIn ? <AppNavigation /> : <Navigate to="/" />} 
            />
          </Routes>
        </Router>
      </HelmetProvider>
    </Provider>
  );
}

export default App;