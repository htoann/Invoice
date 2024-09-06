import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

export const useTableDataSource = (list, current, pageSize) => {
  const { t } = useTranslation();

  return list.map((item, index) => {
    const { id, time, name, state, note, totalInvoice, newInvoice } = item;
    return {
      key: id,
      stt: (current - 1) * pageSize + index + 1,
      id,
      time: <span>{time}</span>,
      name: <span>{name}</span>,
      state: (
        <Tag color={state === 1 ? '#01b81a' : '#f5222d'}>{state === 1 ? t('Common_Success') : t('Common_Failure')}</Tag>
      ),
      note: <span>{note}</span>,
      totalInvoice: <span>{totalInvoice}</span>,
      newInvoice: <span>{newInvoice}</span>,
    };
  });
};
