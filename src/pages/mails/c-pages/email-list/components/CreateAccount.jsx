import { Modal } from '@/components/modals/antd-modals';
import axios from '@/mock/index';
import { Form, notification } from 'antd';
import { useState } from 'react';
import ModalAccount from './Modal';
import { useTranslation } from 'react-i18next';

function CreateAccount({ state, setState, accounts, setAccounts }) {
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
      const response = await axios.post('/api/accounts', data);
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
        message: t('Thành công'),
        description: t('Tài khoản đã được tạo thành công'),
      });
      form.resetFields();
    } else {
      notification.error({
        message: t('Lỗi'),
        description: t('Đã xảy ra lỗi khi tạo tài khoản'),
      });
    }
  };

  return (
    <Modal type="primary" title={t('Tạo tài khoản')} open={state.visible} footer={null} onCancel={onCancel}>
      <div className="project-modal">
        <ModalAccount form={form} handleOk={handleOk} onCancel={onCancel} loading={loading} textSubmit={t('Tạo')} />
      </div>
    </Modal>
  );
}

export default CreateAccount;
