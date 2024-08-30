import CustomHeader from '@/components/HeaderCommon';
import { useTranslation } from 'react-i18next';

export const useDataTable = (propsCustomHeader) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('STT'),
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: <CustomHeader title="Common_AccountName" name="name" {...propsCustomHeader} />,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.props.children.localeCompare(b.name.props.children),
      className: 'searchInput',
    },
    {
      title: <CustomHeader title="Common_Email" name="email" {...propsCustomHeader} />,
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.props.children.localeCompare(b.email.props.children),
      className: 'searchInput',
    },
    {
      title: <>{t('Common_Department')}</>,
      dataIndex: 'department',
      key: 'department',
      sorter: (a, b) => a.department.props.children.localeCompare(b.department.props.children),
    },
    {
      title: t('Common_Action'),
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  return columns;
};
