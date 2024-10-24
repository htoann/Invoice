import Forbidden from '@/container/pages/Forbidden';
import LayoutWrapper from '@/layout/LayoutWrapper';
import { Spin } from 'antd';
import { usePermission } from 'hooks/usePermission';
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
    { path: routes.invoiceConnectTax, element: <ConnectTaxAuthority />, permission: PERMISSIONS.TAX_VIEW },

    { path: routes.emailAccount, element: <AccountsList />, permission: PERMISSIONS.EMAIL_ACCOUNT_VIEW },
    { path: routes.emailInbox, element: <Email />, permission: PERMISSIONS.INBOX_VIEW },
    { path: routes.emailSync, element: <SyncHistory />, permission: PERMISSIONS.SYNC_HISTORY_VIEW },

    { path: routes.categoryOrg, element: <Organization />, permission: PERMISSIONS.ORG_STRUCTURE_VIEW },
    { path: routes.categoryProvider, element: <Providers />, permission: PERMISSIONS.PROVIDER_VIEW },
    { path: routes.categoryCustomer, element: <Customers />, permission: PERMISSIONS.CUSTOMER_VIEW },
    { path: routes.categoryProduct, element: <Products />, permission: PERMISSIONS.PRODUCT_VIEW },
    { path: routes.categoryTaxPayer, element: <TaxPayer />, permission: PERMISSIONS.TAXPAYER_VIEW },
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
