
// frontend/src/App.jsx
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import AppNavigation from './navigation/Navigation';
import store from './redux/Store';

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