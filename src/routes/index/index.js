import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import withAdminLayout from '../../layout/withAdminLayout';
import InvoiceList from '../../pages/invoice/InvoiceList';
import AccountList from '../../pages/mails/AccountList';
import Axios from './axios';
import Dashboard from './dashboard';
import Ecommerce from './ecommerce';
import Features from './features';
import Gallery from './gallery';
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
const Courses = lazy(() => import('../../container/course/Index'));
const CourseDetails = lazy(() => import('../../container/course/CourseDetails'));
const Import = lazy(() => import('../../container/importExport/Import'));
const Export = lazy(() => import('../../container/importExport/Export'));
const ToDo = lazy(() => import('../../container/toDo/ToDo'));
const Note = lazy(() => import('../../container/note/Note'));
const Contact = lazy(() => import('../../container/contact/Contact'));
const ContactGrid = lazy(() => import('../../container/contact/ContactGrid'));
const ContactAddNew = lazy(() => import('../../container/contact/AddNew'));
const Projects = lazy(() => import('./projects'));
const Myprofile = lazy(() => import('../../container/profile/myProfile/Index'));
const Chat = lazy(() => import('../../container/chat/ChatApp'));
const Inbox = lazy(() => import('../../container/email/Email'));
const Editors = lazy(() => import('../../container/pages/Editor'));
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
        <Route path="pages/*" element={<Pages />} />
        <Route path="gallery/*" element={<Gallery />} />
        <Route path="all-articles" element={<AllArticle />} />
        <Route path="knowledgeBase/*" element={<KnowledgeBase />} />
        <Route path="knowledgebaseSingle/:id" element={<KnowledgeSingle />} />
        <Route path="components/*" element={<Components />} />
        <Route path="app/task/*" element={<Task />} />
        <Route path="users/*" element={<Users />} />
        <Route path="app/support/tickets/*" element={<Tickets />} />
        <Route path="app/support/tickets/add" element={<AddTicket />} />
        <Route path="app/support/ticketDetails/:id" element={<TicketDetails />} />
        <Route path="app/course/courseDetails/:id" element={<CourseDetails />} />
        <Route path="app/course/*" element={<Courses />} />
        <Route path="importExport/import" element={<Import />} />
        <Route path="importExport/export" element={<Export />} />
        <Route path="app/to-do" element={<ToDo />} />
        <Route path="app/note/*" element={<Note />} />
        <Route path="contact/list" element={<Contact />} />
        <Route path="contact/grid" element={<ContactGrid />} />
        <Route path="contact/addNew" element={<ContactAddNew />} />
        <Route path="features/*" element={<Features />} />
        <Route path="project/*" element={<Projects />} />
        <Route path="profile/myProfile/*" element={<Myprofile />} />
        <Route path="ecommerce/*" element={<Ecommerce />} />
        <Route path="main/chat/*" element={<Chat />} />
        {/* Change routes */}
        <Route path="invoices" element={<InvoiceList />} />
        <Route path="email/account-list" element={<AccountList />} />
        <Route path="email/*" element={<Inbox />} />
        <Route path="editor" element={<Editors />} />
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