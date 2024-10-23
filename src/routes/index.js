import Forbidden from '@/container/pages/Forbidden';
import LayoutWrapper from '@/layout/LayoutWrapper';
import { Spin } from 'antd';
import { usePermission } from 'hooks/checkUserPermission';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { PERMISSIONS } from '../utils';
import { routes } from './const';

const Dashboard = lazy(() => import('@/pages/dashboard'));
const InvoiceList = lazy(() => import('@/pages/invoice/InvoiceList'));
const ConnectTaxAuthority = lazy(() => import('@/pages/invoice/c-pages/TaxConnect'));

const Email = lazy(() => import('@/pages/mails/c-pages/inbox/Inbox'));
const AccountsList = lazy(() => import('@/pages/mails/c-pages/accounts/AccountsList'));
const SyncHistory = lazy(() => import('@/pages/mails/c-pages/sync-history/SyncHistory'));

const Products = lazy(() => import('@/pages/category/c-pages/products/Products'));
const Customers = lazy(() => import('@/pages/category/c-pages/customers/Customers'));
const Providers = lazy(() => import('@/pages/category/c-pages/providers/Providers'));
const Organization = lazy(() => import('@/pages/category/c-pages/organization/Organization'));
const TaxPayer = lazy(() => import('@/pages/category/c-pages/tax-payer/TaxPayer'));

const NotFound = lazy(() => import('@/container/pages/NotFound'));

const Index = React.memo(() => {
  const { pathname } = useLocation();
  const checkPermission = usePermission();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const routesConfig = [
    { path: '/', element: <Dashboard />, index: true },
    { path: routes.invoice, element: <InvoiceList />, permission: PERMISSIONS.INVOICE_LIST_VIEW },
    { path: routes.invoiceConnectTax, element: <ConnectTaxAuthority /> },
    { path: routes.emailAccount, element: <AccountsList /> },
    { path: routes.emailSync, element: <SyncHistory /> },
    { path: routes.email + '/*', element: <Email /> },
    { path: routes.categoryProduct, element: <Products /> },
    { path: routes.categoryProvider, element: <Providers /> },
    { path: routes.categoryCustomer, element: <Customers /> },
    { path: routes.categoryOrg, element: <Organization /> },
    { path: routes.categoryTaxPayer, element: <TaxPayer /> },
    { path: '*', element: <NotFound /> },
  ];

  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        {routesConfig.map((route, index) =>
          !route.permission || checkPermission(route.permission) ? (
            <Route key={index} path={route.path} element={route.element} index={route.index} />
          ) : (
            <Route key={index} path={route.path} element={<Forbidden />} index={route.index} />
          ),
        )}
      </Routes>
    </Suspense>
  );
});

export default LayoutWrapper(Index);
