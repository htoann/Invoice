import Email from '@/pages/mails/c-pages/inbox';
import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import withAdminLayout from '../../layout/withAdminLayout';
import { CoCauToChuc } from '../../pages/category/c-pages/co-cau-to-chuc/CoCauToChuc';
import { HangHoa } from '../../pages/category/c-pages/hang-hoa/HangHoa';
import InvoiceList from '../../pages/invoice/InvoiceList';
import { EmailList } from '../../pages/mails/c-pages/email-list/EmailList';
import Axios from './axios';
import Dashboard from './dashboard';
import Ecommerce from './ecommerce';
import Features from './features';
import Pages from './pages';
import Users from './users';
import Widgets from './widgets';

const KnowledgeBase = lazy(() => import('../../container/pages/knowledgeBase/Index'));
const AllArticle = lazy(() => import('../../container/pages/knowledgeBase/AllArticle'));
const KnowledgeSingle = lazy(() => import('../../container/pages/knowledgeBase/SingleKnowledge'));
const Components = lazy(() => import('./components'));
const Task = lazy(() => import('../../container/task/Index'));
const Tickets = lazy(() => import('../../container/supportTicket/Index'));
const AddTicket = lazy(() => import('../../container/supportTicket/AddSupport'));
const TicketDetails = lazy(() => import('../../container/supportTicket/SupportTicketDetails'));
const Import = lazy(() => import('../../container/importExport/Import'));
const Note = lazy(() => import('../../container/note/Note'));
const Contact = lazy(() => import('../../container/contact/Contact'));
const ContactGrid = lazy(() => import('../../container/contact/ContactGrid'));
const ContactAddNew = lazy(() => import('../../container/contact/AddNew'));
const Projects = lazy(() => import('./projects'));
const Myprofile = lazy(() => import('../../container/profile/myProfile/Index'));
const Chat = lazy(() => import('../../container/chat/ChatApp'));
const Icons = lazy(() => import('./icons'));
const Tables = lazy(() => import('./table'));
const Jobs = lazy(() => import('../../container/jobSearch/Jobs'));
const JobDetails = lazy(() => import('../../container/jobSearch/JobSearchDetails'));
const JobApply = lazy(() => import('../../container/jobSearch/JobApplication'));
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

        {/* Change routes */}
        <Route path="invoices" element={<InvoiceList />} />
        <Route path="email" element={<EmailList />} />
        <Route path="email/*" element={<Email />} />
        <Route path="danh-muc/hang-hoa" element={<HangHoa />} />
        <Route path="danh-muc/co-cau-to-chuc" element={<CoCauToChuc />} />

        <Route path="pages/*" element={<Pages />} />
        <Route path="all-articles" element={<AllArticle />} />
        <Route path="knowledgeBase/*" element={<KnowledgeBase />} />
        <Route path="knowledgebaseSingle/:id" element={<KnowledgeSingle />} />
        <Route path="components/*" element={<Components />} />
        <Route path="app/task/*" element={<Task />} />
        <Route path="users/*" element={<Users />} />
        <Route path="app/support/tickets/*" element={<Tickets />} />
        <Route path="app/support/tickets/add" element={<AddTicket />} />
        <Route path="app/support/ticketDetails/:id" element={<TicketDetails />} />
        <Route path="importExport/import" element={<Import />} />
        <Route path="app/note/*" element={<Note />} />
        <Route path="contact/list" element={<Contact />} />
        <Route path="contact/grid" element={<ContactGrid />} />
        <Route path="contact/addNew" element={<ContactAddNew />} />
        <Route path="features/*" element={<Features />} />
        <Route path="project/*" element={<Projects />} />
        <Route path="profile/myProfile/*" element={<Myprofile />} />
        <Route path="ecommerce/*" element={<Ecommerce />} />
        <Route path="main/chat/*" element={<Chat />} />
        <Route path="icons/*" element={<Icons />} />
        <Route path="tables/*" element={<Tables />} />
        <Route path="widgets/*" element={<Widgets />} />
        <Route path="app/jobs/*" element={<Jobs />} />
        <Route path="app/job/apply" element={<JobApply />} />
        <Route path="app/jobDetails/:id" element={<JobDetails />} />
        <Route path="axios/*" element={<Axios />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Index);
