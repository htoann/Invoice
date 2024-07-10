import { Form, Input } from 'antd';
import { Button } from '../../../../../components/buttons/buttons';
import { Modal } from '../../../../../components/modals/antd-modals';
import { AddUser } from '../../../../../container/pages/style';
import { BasicFormWrapper } from '../../../../../container/styled';
import axios from '../../../mockApi';
import { useState } from 'react';

function CreateAccount({ state, setState, accounts, setAccounts }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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
      console.error('Failed to create account', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async (values) => {
    const newAccount = await createNewAccount(values);
    if (newAccount) {
      setAccounts([...accounts, newAccount]);
      onCancel();
    }
  };

  return (
    <Modal type="primary" title="Tạo người dùng" visible={state.visible} footer={null} onCancel={onCancel}>
      <div className="project-modal">
        <AddUser>
          <BasicFormWrapper>
            <Form form={form} name="create_account" onFinish={handleOk}>
              <Form.Item
                name="username"
                label="Tên tài khoản"
                rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Vui lòng nhập email', type: 'email' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button size="default" type="white" style={{ marginRight: 8 }} outlined onClick={onCancel}>
                  Huỷ bỏ
                </Button>
                <Button htmlType="submit" size="default" type="primary" loading={loading}>
                  Tạo
                </Button>
              </div>
            </Form>
          </BasicFormWrapper>
        </AddUser>
      </div>
    </Modal>
  );
}

export default CreateAccount;
