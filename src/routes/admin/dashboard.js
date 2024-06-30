import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const DemoTwo = lazy(() => import('../../container/dashboard/DemoTwo'));
const NotFound = lazy(() => import('../../container/pages/404'));

function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<DemoTwo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default DashboardRoutes;
