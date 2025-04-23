// frontend/src/App.jsx
import { HelmetProvider } from 'react-helmet-async'; //sed to manage and update the <head> of your page 
import AppNavigation from './navigation/Navigation';
import { Provider } from 'react-redux';
import store from './redux/store'; //isnstead of store, Add new slices if you want new pieces of state (e.g., user progress, quizzes)
import { ToastContainer } from 'react-toastify';
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
    </Provider>
  );
}

export default App;