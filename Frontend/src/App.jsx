
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// frontend/src/App.jsx
main
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import AppNavigation from './navigation/Navigation';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  return (
    <Provider store={store}>
      <HelmetProvider>       
        <div className="main-page-wrapper">
          <ToastContainer />
            <AppNavigation />
        </div>
      </HelmetProvider> 

    </Provider>
  );
}

export default App;