import { HelmetProvider } from 'react-helmet-async';
import AppNavigation from './navigation/Navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatWidget from './components/chat/ChatWidget';



function App() {

  return (
    <Provider store={store}>
      <HelmetProvider>       
        <div className="main-page-wrapper">
          <ToastContainer />
          <AppNavigation />

          {/* Section principale */}


          {/* Widget de chat affiché partout pour l’instant */}
          <ChatWidget />
            
        </div>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
