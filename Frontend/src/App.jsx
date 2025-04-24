import { HelmetProvider } from 'react-helmet-async';
import AppNavigation from './navigation/Navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatWidget from './components/chat/ChatWidget';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Provider store={store}>
      <HelmetProvider>

       
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
