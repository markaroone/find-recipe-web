import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserContext from '../../context/UserProvider';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(UserContext);

  return isLoggedIn ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoutes;
