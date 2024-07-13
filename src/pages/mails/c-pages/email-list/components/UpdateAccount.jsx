import { Modal } from '@/components/modals/antd-modals';
import axios from '@/mock/mails/mockApi';
import { Form, notification } from 'antd';
import { useState } from 'react';
import ModalAccount from './Modal';

const UpdateAccount = ({ state, setState, accounts, setAccounts }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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

      const response = await axios.put(`/api/accounts/${state.update.id}`, values);
      const updatedAccount = response.data;

      const updatedAccounts = accounts.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc));
      setAccounts(updatedAccounts);

      form.resetFields();
      onCancel();

      notification.success({
        message: 'Cập nhật thành công',
        description: 'Thông tin tài khoản đã được cập nhật thành công.',
      });
    } catch (error) {
      notification.error({
        message: 'Cập nhật thất bại',
        description: 'Không thể cập nhật thông tin tài khoản. Vui lòng thử lại.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      type={state.modalType}
      title="Cập nhật người dùng"
      visible={state.editVisible}
      footer={null}
      onCancel={onCancel}
    >
      <ModalAccount
        form={form}
        handleOk={handleOk}
        state={state}
        onCancel={onCancel}
        loading={loading}
        textSubmit="Lưu"
      />
    </Modal>
  );
};

export default UpdateAccount;
