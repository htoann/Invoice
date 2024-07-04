import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Carts = lazy(() => import('../../container/widgets/Cards'));
const NotFound = lazy(() => import('../../container/pages/404'));

function WidgetsRoute() {
  return (
    <Routes>
      <Route path="card" element={<Carts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default WidgetsRoute;
