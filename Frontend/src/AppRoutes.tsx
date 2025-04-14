// src/routes/AppRoutes.tsx

import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<SignIn />} />

      <Route path="/Signin" element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
