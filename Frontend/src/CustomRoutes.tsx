// // CustomRoutes.tsx
// import { Routes, Route, useLocation } from 'react-router-dom';
// import AppNavigation from './navigation/Navigation';
// import SignIn from './SignIn';

// const CustomRoutes = () => {
//   const location = useLocation();

//   // Si l'URL est exactement "/", afficher la page de login
//   if (location.pathname === "/") {
//     return (
//       <Routes>
//         <Route path="/signin" element={<SignIn />} />
//       </Routes>
//     );
//   }

//   // Pour toutes les autres routes, utiliser AppNavigation
//   return <AppNavigation />;
// };

// export default CustomRoutes;