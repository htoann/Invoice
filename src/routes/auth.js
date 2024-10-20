import { useAuth } from 'context/AuthContext';
import React, { lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthLayout from '../container/auth/Index';
import { routes } from './const';

const Login = lazy(() => import('../container/auth/pages/SignIn'));
// const SignUp = lazy(() => import('../container/profile/authentication/overview/SignUp'));

const AuthRoot = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate(routes.login);
    }
  }, [isLoggedIn]);
};

const FrontendRoutes = React.memo(() => {
  return (
    <Routes>
      <Route index path="login" element={<Login />} />
      {/* <Route path="register" element={<SignUp />} /> */}
      <Route path="*" element={<AuthRoot />} />
    </Routes>
  );
});

export default AuthLayout(FrontendRoutes);
