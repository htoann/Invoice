import routes from '@/routes/index';
import i18next from 'i18next';

export const pageRoutes = [
  {
    path: routes.emailAccount,
    breadcrumbName: i18next.t('Common_Mail'),
  },
  {
    path: routes.emailInbox,
    breadcrumbName: i18next.t('Common_Inbox'),
  },
];
