import { Modal } from '@/components/modals/antd-modals';
import { API_MAILS_ACCOUNTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalAccount } from './Modal';

export const CreateAccount = ({ state, setState, accounts, setAccounts, departments }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onCancel = () => {
    setState({ ...state, visible: false });
    form.resetFields();
  };

  const createNewAccount = async (data) => {
    try {
      setLoading(true);
      const response = await dataService.post(API_MAILS_ACCOUNTS, data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async (values) => {
    const newAccount = await createNewAccount(values);
    if (newAccount) {
      setAccounts([newAccount, ...accounts]);
      onCancel();
      notification.success({
        message: t('Common_Success'),
        description: t('Mail_CreateAccount_Success'),
      });
      form.resetFields();
    } else {
      notification.error({
        message: t('Common_Error'),
        description: t('Mail_CreateAccount_Error'),
      });
    }
  };

  return (
    <Modal title={t('Mail_CreateAccount_Title')} open={state.visible} onCancel={onCancel}>
      <div className="project-modal">
        <ModalAccount
          form={form}
          handleOk={handleOk}
          onCancel={onCancel}
          loading={loading}
          textSubmit={t('Common_Create')}
          departments={departments}
        />
      </div>
    </Modal>
  );
};