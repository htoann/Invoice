import { Modal } from '@/components/modals/antd-modals';
import { BasicFormWrapper } from '@/container/styled';
import axios from '@/pages/mails/mockApi';
import { Button, Form, Input, notification } from 'antd';
import { useState } from 'react';

const UpdateAccount = ({ state, setState, accounts, setAccounts }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onCancel = () => {
    setState((prevState) => ({
      ...prevState,
      editVisible: false,
    }));
  };

  const handleEditOk = async (values) => {
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
      <BasicFormWrapper>
        <Form form={form} name="edit_account" onFinish={handleEditOk}>
          <Form.Item initialValue={state.update.username} label="Tên đăng nhập" name="username">
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ Email"
            name="email"
            rules={[{ message: 'Vui lòng nhập địa chỉ email!', type: 'email' }]}
            initialValue={state.update.email}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>

          <Form.Item initialValue={state.update.password} name="password" label="Mật khẩu">
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <div style={{ justifyContent: 'end', display: 'flex' }}>
            <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={onCancel}>
              Huỷ bỏ
            </Button>
            <Button htmlType="submit" size="default" type="primary" key="submit" loading={loading}>
              Lưu
            </Button>
          </div>
        </Form>
      </BasicFormWrapper>
    </Modal>
  );
};

export default UpdateAccount;
