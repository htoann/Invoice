import { useAuth } from 'context/AuthContext';
import propTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';

function ProtectedRoute({ Component, path }) {
  const { isLoggedIn } = useAuth();

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
  Component: propTypes.object.isRequired,
  path: propTypes.string.isRequired,
};

export default ProtectedRoute;
