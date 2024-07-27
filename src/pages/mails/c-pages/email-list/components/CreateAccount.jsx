import { Modal } from '@/components/modals/antd-modals';
import axios from '@/mock/index';
import GoogleIcon from '@/static/img/icon/google-customIcon.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalAccount from './Modal';
import './index.scss';

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
      const response = await axios.post('/accounts', data);
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

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log('Login Success:', response);
    },
    onFailure: (error) => {
      console.log('Login Failed:', error);
    },
  });

  return (
    <Modal type="primary" title={t('Mail_CreateAccount_Title')} open={state.visible} footer={null} onCancel={onCancel}>
      <div className="project-modal">
        <button type="button" className="login-btn" onClick={login}>
          <img src={GoogleIcon} className="icon" /> {t('Kết nối với tài khoản email')}
        </button>
        <ModalAccount
          form={form}
          handleOk={handleOk}
          onCancel={onCancel}
          loading={loading}
          textSubmit={t('Common_Create')}
        />
      </div>
    </Modal>
  );
}

export default CreateAccount;
