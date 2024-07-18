import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const NotFound = lazy(() => import('../../container/pages/404'));
const Pricing = lazy(() => import('../../container/pages/PricingTable'));
const Maintenance = lazy(() => import('../../container/pages/Maintenance'));
const Faq = lazy(() => import('../../container/pages/Faq'));
const Search = lazy(() => import('../../container/pages/SearchResult'));
const ComingSoon = lazy(() => import('../../container/pages/ComingSoon'));
const TermsCondition = lazy(() => import('../../container/pages/TermsComditions'));
const Wizards = lazy(() => import('../../container/pages/wizards/Wizards'));
const BlankPage = lazy(() => import('../../container/pages/BlankPage'));
const Settings = lazy(() => import('../../container/profile/settings/Settings'));
const Banners = lazy(() => import('../../container/pages/Banners'));

function PagesRoute() {
  return (
    <Routes>
      <Route path="settings/*" element={<Settings />} />
      <Route path="Pricing" element={<Pricing />} />
      <Route path="banners" element={<Banners />} />
      <Route path="faq" element={<Faq />} />
      <Route path="search" element={<Search />} />
      <Route path="starter" element={<BlankPage />} />
      <Route path="comingSoon" element={<ComingSoon />} />
      <Route path="termCondition" element={<TermsCondition />} />
      <Route path="wizards/*" element={<Wizards />} />
      <Route path="*" element={<NotFound />} />
      <Route path="maintenance" element={<Maintenance />} />
    </Routes>
  );
}

export default PagesRoute;
