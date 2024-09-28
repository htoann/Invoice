import { formatDate } from '@/utils/index';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

export const useTableDataSource = (list, current, pageSize) => {
  const { t } = useTranslation();

  return list.map((item, index) => {
    const { id, account, time, start_date, end_date, num_of_invoices, status } = item;
    return {
      key: id,
      stt: (current - 1) * pageSize + index + 1,
      id,
      account: <span>{account}</span>,
      time: <span>{formatDate(time, 'DD/MM/YYYY HH:mm')}</span>,
      sync_date: (
        <span>
          {start_date === end_date ? formatDate(start_date) : `${formatDate(start_date)} - ${formatDate(end_date)}`}
        </span>
      ),
      num_of_invoices: <span>{num_of_invoices}</span>,
      status: (
        <Tag color={status === 1 ? '#01b81a' : '#f5222d'}>
          {status === 1 ? t('Common_Success') : t('Common_Failure')}
        </Tag>
      ),
    };
  });
};
