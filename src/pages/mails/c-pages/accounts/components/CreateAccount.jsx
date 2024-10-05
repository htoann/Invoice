import { API_MAILS_ACCOUNTS, dataService } from '@/service';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalAccount } from './ModalAccount';

export const CreateAccount = ({ state, setState, getList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const createNewAccount = async (data) => {
    try {
      setLoading(true);
      const response = await dataService.post(API_MAILS_ACCOUNTS, data);
      return response.data;
    } catch (err) {
      console.error(err);
      const errMsg =
        err?.response?.data?.errors?.code === 'duplicated_email'
          ? t('Common_DuplicatedEmailAccount')
          : t('Auth_Failed_Credential');
      notification.error({
        message: t('Common_Error'),
        description: errMsg,
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async (values) => {
    const newAccount = await createNewAccount(values);
    if (newAccount) {
      getList();
      onCancel();
      notification.success({
        message: t('Common_Success'),
        description: t('Mail_CreateAccount_Success'),
      });
      form.resetFields();
    }
  };

  const onCancel = () => {
    setState({ ...state, visible: false });
    form.resetFields();
  };

  return (
    <ModalAccount
      title={t('Mail_CreateAccount_Title')}
      open={state.visible}
      form={form}
      handleOk={handleOk}
      onCancel={onCancel}
      loading={loading}
      textSubmit={t('Common_Create')}
    />
  );
};
