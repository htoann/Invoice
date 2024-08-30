import CustomHeader from '@/components/HeaderCommon';
import { useTranslation } from 'react-i18next';

export const useTableColumnSyncHistory = (propsCustomHeader) => {
  const t = useTranslation();

  const columns = [
    {
      title: t('Common_STT'),
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: t('Common_Time'),
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => a.time.props.children.localeCompare(b.time.props.children),
    },
    {
      title: t('Common_Query'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.props.children.localeCompare(b.name.props.children),
    },
    {
      title: <CustomHeader title="Common_Status" name="state" {...propsCustomHeader} />,
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => a.state.props.children > b.state.props.children,
      className: 'searchInput',
    },
    {
      title: <CustomHeader title="Common_Note" name="note" {...propsCustomHeader} />,
      dataIndex: 'note',
      key: 'note',
      sorter: (a, b) => a.note.props.children.localeCompare(b.note.props.children),
      className: 'searchInput',
    },
    {
      title: t('SyncHistory_TotalInvoice'),
      dataIndex: 'totalInvoice',
      key: 'totalInvoice',
      sorter: (a, b) => a.totalInvoice.props.children > b.totalInvoice.props.children,
    },
    {
      title: t('SyncHistory_NewInvoice'),
      dataIndex: 'newInvoice',
      key: 'newInvoice',
      sorter: (a, b) => a.newInvoice.props.children > b.newInvoice.props.children,
    },
  ];

  return columns;
};
