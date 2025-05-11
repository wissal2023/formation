
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import AppNavigation from './navigation/Navigation';
import { ToastContainer, toast } from 'react-toastify';
import  store from './redux/store';

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