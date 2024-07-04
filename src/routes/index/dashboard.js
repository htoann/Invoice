import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import('../../container/dashboard'));
const NotFound = lazy(() => import('../../container/pages/404'));

function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default DashboardRoutes;
