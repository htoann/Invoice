import React, { lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthLayout from '@/container/profile/authentication/Index';

const Login = lazy(() => import('@/container/profile/authentication/overview/SignIn'));
const SignUp = lazy(() => import('@/container/profile/authentication/overview/Signup'));

const AuthRoot = () => {
  const navigate = useNavigate();

  useEffect(() => navigate('/'));
};

const FrontendRoutes = React.memo(() => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="register" element={<SignUp />} />
      <Route path="*" element={<AuthRoot />} />
    </Routes>
  );
});

export default AuthLayout(FrontendRoutes);
