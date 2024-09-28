import { formatTime } from '@/utils/index';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

export const useTableDataSource = (list, current, pageSize) => {
  const { t } = useTranslation();

  return list.map((item, index) => {
    const { id, account, time, start_date, end_date, number_of_invoices, status } = item;
    return {
      key: id,
      stt: (current - 1) * pageSize + index + 1,
      id,
      account: <span>{account}</span>,
      time: <span>{time}</span>,
      start_date: <span>{formatTime(start_date)}</span>,
      end_date: <span>{formatTime(end_date)}</span>,
      number_of_invoices: <span>{number_of_invoices}</span>,
      state: (
        <Tag color={status === 1 ? '#01b81a' : '#f5222d'}>
          {status === 1 ? t('Common_Success') : t('Common_Failure')}
        </Tag>
      ),
    };
  });
};
