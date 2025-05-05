// frontend/src/App.jsx
import { HelmetProvider } from 'react-helmet-async';
import AppNavigation from './navigation/Navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Provider store={store}>
      <HelmetProvider>       
        <div className="main-page-wrapper">
          <ToastContainer />
          {/* Section principale */}
          {/* Widget de chat affiché partout pour l’instant */}
          <ChatWidget />
            <AppNavigation />
        </div>
      </HelmetProvider> 
    </Provider>
  );
}

export default App;
