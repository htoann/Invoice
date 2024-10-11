import WithAdminLayout from '@/layout/withAdminLayout';
import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { routes } from './const';

const Dashboard = lazy(() => import('@/pages/dashboard'));
const InvoiceList = lazy(() => import('@/pages/invoice/InvoiceList'));
const ConnectTaxAuthority = lazy(() => import('@/pages/invoice/c-pages/ConnectTaxAuthority'));

const Email = lazy(() => import('@/pages/mails/c-pages/inbox/Inbox'));
const AccountsList = lazy(() => import('@/pages/mails/c-pages/accounts/AccountsList'));
const SyncHistory = lazy(() => import('@/pages/mails/c-pages/sync-history/SyncHistory'));

const Products = lazy(() => import('@/pages/category/c-pages/products/Products'));
const Customers = lazy(() => import('@/pages/category/c-pages/customers/Customers'));
const Providers = lazy(() => import('@/pages/category/c-pages/providers/Providers'));
const Organization = lazy(() => import('@/pages/category/c-pages/organization/Organization'));
const TaxPayer = lazy(() => import('@/pages/category/c-pages/tax-payer/TaxPayer'));

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
        <Route path={routes.invoiceConnectTax} element={<ConnectTaxAuthority />} />

        <Route path={routes.emailAccount} element={<AccountsList />} />
        <Route path={routes.emailSync} element={<SyncHistory />} />
        <Route path={routes.email + '/*'} element={<Email />} />

        <Route path={routes.categoryProduct} element={<Products />} />
        <Route path={routes.categoryProvider} element={<Providers />} />
        <Route path={routes.categoryCustomer} element={<Customers />} />
        <Route path={routes.categoryOrg} element={<Organization />} />
        <Route path={routes.categoryTaxPayer} element={<TaxPayer />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default WithAdminLayout(Index);
