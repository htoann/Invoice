import { API_MAILS_ACCOUNT_BY_ACCOUNT_ID, dataService } from '@/service';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalAccount } from './Modal';

export const UpdateAccount = ({ state, setState, accounts, setAccounts }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onCancel = () => {
    setState({ ...state, editVisible: false });
    form.resetFields();
  };

  const handleOk = async (values) => {
    try {
      setLoading(true);

      const response = await dataService.put(API_MAILS_ACCOUNT_BY_ACCOUNT_ID(state.update.id), values);
      const updatedAccount = response.data;

      const updatedAccounts = accounts.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc));
      setAccounts(updatedAccounts);

      form.resetFields();
      onCancel();

      notification.success({
        message: t('Common_Success'),
        description: t('Mail_UpdateAccount_Success'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Error'),
        description: t('Mail_UpdateAccount_Error'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalAccount
      title={t('Mail_UpdateAccount_Title')}
      open={state.editVisible}
      form={form}
      handleOk={handleOk}
      state={state}
      onCancel={onCancel}
      loading={loading}
      textSubmit={t('Common_Save')}
    />
  );
};
