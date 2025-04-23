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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatWidget from './components/chat/ChatWidget';
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

        <div className="main-page-wrapper">
          <ToastContainer />
          <AppNavigation />

          {/* Section principale 
          <main>
            <h1>Bienvenue sur notre plateforme!</h1>
          </main>
           Widget de chat affiché partout pour l’instant */}
          <ChatWidget />
        </div>

      </HelmetProvider>
    </Provider>
  );
}

export default App;