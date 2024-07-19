import { Modal } from '@/components/modals/antd-modals';
import axios from '@/mock/index';
import { Form, notification } from 'antd';
import { useState } from 'react';
import ModalAccount from './Modal';
import { useTranslation } from 'react-i18next';

const UpdateAccount = ({ state, setState, accounts, setAccounts }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onCancel = () => {
    setState((prevState) => ({
      ...prevState,
      editVisible: false,
    }));
    form.resetFields();
  };

  const handleOk = async (values) => {
    try {
      setLoading(true);

      const response = await axios.put(`/accounts/${state.update.id}`, values);
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
      console.log(error);
      notification.error({
        message: t('Common_Error'),
        description: t('Mail_UpdateAccount_Error'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      type={state.modalType}
      title={t('Mail_UpdateAccount_Title')}
      open={state.editVisible}
      footer={null}
      onCancel={onCancel}
    >
      <ModalAccount
        form={form}
        handleOk={handleOk}
        state={state}
        onCancel={onCancel}
        loading={loading}
        textSubmit={t('Common_Save')}
      />
    </Modal>
  );
};

export default UpdateAccount;
