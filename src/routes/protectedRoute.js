import { useAuth } from 'context/AuthContext';
import propTypes from 'prop-types';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { routes } from './const';

function ProtectedRoute({ Component, path }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/');
    } else if (!isLoggedIn) {
      navigate(routes.login);
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <Routes>
      <Route element={<Component />} path={path} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}

ProtectedRoute.propTypes = {
  path: propTypes.string.isRequired,
};

export default ProtectedRoute;
