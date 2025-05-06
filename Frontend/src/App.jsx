<<<<<<< HEAD
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
=======
// frontend/src/App.jsx
>>>>>>> main
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './redux/store';
<<<<<<< HEAD
import AppNavigation from './navigation/Navigation';
import SignIn from '/src/SignIn';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Provider store={store}>
      <HelmetProvider>
        <Router>
          <Routes>
            {/* Si l'utilisateur n'est pas connecté et essaie d'accéder à une route autre que "/", 
                rediriger vers la page de connexion */}
            <Route 
              path="/" 
              element={isLoggedIn ? <Navigate to="/SignIn" /> : <SignIn />} 
            />
            
            {/* Pour toutes les autres routes, vérifier si l'utilisateur est connecté */}
            <Route 
              path="/*" 
              element={isLoggedIn ? <AppNavigation /> : <Navigate to="/" />} 
            />
          </Routes>
        </Router>
      </HelmetProvider>
=======
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <Provider store={store}>
      <HelmetProvider>       
        <div className="main-page-wrapper">
          <ToastContainer />
            <AppNavigation />
        </div>
      </HelmetProvider> 
>>>>>>> main
    </Provider>
  );
}

export default App;