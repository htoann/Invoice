import { useTranslation } from 'react-i18next';

export const useTableColumnSyncHistory = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('Common_STT'),
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: t('Common_Account'),
      dataIndex: 'account',
      key: 'account',
      sorter: (a, b) => a?.account?.props?.children?.localeCompare(b?.account?.props?.children),
    },
    {
      title: t('Thời gian hoàn thành'),
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => a?.time?.props?.children?.localeCompare(b?.time?.props?.children),
    },
    {
      title: t('Ngày đồng bộ'),
      dataIndex: 'sync_date',
      key: 'sync_date',
    },
    {
      title: t('SyncHistory_TotalInvoice'),
      dataIndex: 'num_of_invoices',
      key: 'num_of_invoices',
      sorter: (a, b) => a?.num_of_invoices?.props?.children > b?.num_of_invoices?.props?.children,
    },
    {
      title: t('Common_Status'),
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a?.status?.props?.children > b?.status?.props?.children,
    },
  ];

  return columns;
};
