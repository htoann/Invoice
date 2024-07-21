import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

function ProtectedRoute({ Component, path }) {
  const isLoggedIn = useSelector((state) => state.auth.login);

  return isLoggedIn ? (
    <Routes>
      <Route element={<Component />} path={path} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/invoice" element={<Navigate to="/" />} />
    </Routes>
  );
}

ProtectedRoute.propTypes = {
  Component: propTypes.object.isRequired,
  path: propTypes.string.isRequired,
};

export default ProtectedRoute;
