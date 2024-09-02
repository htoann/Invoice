import { useGetMailAccounts } from '@/pages/mails/hooks/useGetMailAccounts';
import { createOptions } from '@/utils/index';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

export const MailAccountSelect = ({ onChange, value, labelStyle, selectStyle }) => {
  const { t } = useTranslation();

  const { loadingMailAccounts, mailAccountList } = useGetMailAccounts();

  const accountOptions = createOptions(mailAccountList, 'email');

  return (
    <>
      <span className="label" style={labelStyle}>
        {t('Common_SelectAccount')}
      </span>
      <Select
        popupClassName="dropdown-select"
        style={{ width: 200, marginLeft: 10, ...selectStyle }}
        loading={loadingMailAccounts}
        disabled={loadingMailAccounts}
        onChange={onChange}
        value={value}
        options={accountOptions}
      />
    </>
  );
};
