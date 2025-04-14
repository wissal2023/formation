// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppNavigation from './navigation/Navigation';
import SignIn from './SignIn';

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
              // path="/" 
              // element={isLoggedIn ? <Navigate to="/Login" /> : <Login />} 
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
    </Provider>
  );
}

export default App;