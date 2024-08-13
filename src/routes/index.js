import WithAdminLayout from '@/layout/withAdminLayout';
import Providers from '@/pages/category/c-pages/providers/Providers';
import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { routes } from './const';

const Dashboard = lazy(() => import('@/pages/dashboard'));
const InvoiceList = lazy(() => import('@/pages/invoice/InvoiceList'));
const SyncHistory = lazy(() => import('@/pages/mails/c-pages/sync-history/SyncHistory'));
const Email = lazy(() => import('@/pages/mails/c-pages/inbox/Inbox'));
const EmailList = lazy(() => import('@/pages/mails/c-pages/email-list/EmailList'));
const Products = lazy(() => import('@/pages/category/c-pages/products/Products'));
const Organization = lazy(() => import('@/pages/category/c-pages/organization/Organization'));

const NotFound = lazy(() => import('@/container/pages/404'));

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
        <Route index path="/" element={<Dashboard />} />

        <Route path={routes.invoice} element={<InvoiceList />} />

        <Route path={routes.emailAccount} element={<EmailList />} />
        <Route path={routes.emailSync} element={<SyncHistory />} />
        <Route path={routes.email + '/*'} element={<Email />} />

        <Route path={routes.categoryProduct} element={<Products />} />
        <Route path={routes.categoryProvider} element={<Providers />} />
        <Route path={routes.categoryOrg} element={<Organization />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default WithAdminLayout(Index);
