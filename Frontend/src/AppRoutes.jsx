// src/routes/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from 'src/SignIn';

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