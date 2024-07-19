import Organization from '@/pages/category/c-pages/organization/Organization';
import { Product } from '@/pages/category/c-pages/product/Product';
import Email from '@/pages/mails/c-pages/inbox/Inbox';
import { SyncHistory } from '@/pages/mails/c-pages/sync-history/SyncHistory';
import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import withAdminLayout from '../../layout/withAdminLayout';
import InvoiceList from '../../pages/invoice/InvoiceList';
import { EmailList } from '../../pages/mails/c-pages/email-list/EmailList';
import { routes } from '../const';
import Dashboard from './dashboard';
import Pages from './pages';

const Components = lazy(() => import('./components'));
const Import = lazy(() => import('../../container/importExport/Import'));
const MyProfile = lazy(() => import('../../container/profile/myProfile/Index'));
const Tables = lazy(() => import('./table'));
const NotFound = lazy(() => import('../../container/pages/404'));

const Index = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index path="/*" element={<Dashboard />} />

        <Route path={routes.invoice} element={<InvoiceList />} />
        <Route path={routes.email} element={<EmailList />} />
        <Route path={routes.emailSync} element={<SyncHistory />} />
        <Route path={routes.email + '/*'} element={<Email />} />
        <Route path={routes.categoryProduct} element={<Product />} />
        <Route path={routes.categoryOrg} element={<Organization />} />

        <Route path="pages/*" element={<Pages />} />
        <Route path="components/*" element={<Components />} />
        <Route path="importExport/import" element={<Import />} />
        <Route path="profile/myProfile/*" element={<MyProfile />} />
        <Route path="tables/*" element={<Tables />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Index);
