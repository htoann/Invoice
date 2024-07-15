import { Button } from '@/components/buttons/buttons';
import { BasicFormWrapper } from '@/container/styled';
import { Form, Input } from 'antd';

const ModalAccount = ({ form, handleOk, state, onCancel, loading, textSubmit = 'Lưu' }) => {
  return (
    <BasicFormWrapper>
      <Form form={form} name="edit_account" onFinish={handleOk}>
        <Form.Item initialValue={state?.update?.username} label="Tên tài khoản" name="username">
          <Input placeholder="Nhập tên đăng nhập" />
        </Form.Item>

        <Form.Item
          label="Địa chỉ email"
          name="email"
          rules={[{ message: 'Vui lòng nhập địa chỉ email!', type: 'email', required: true }]}
          initialValue={state?.update.email}
        >
          <Input placeholder="name@example.com" />
        </Form.Item>

        <Form.Item
          initialValue={state?.update?.password}
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <div style={{ justifyContent: 'end', display: 'flex' }}>
          <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={onCancel}>
            Huỷ bỏ
          </Button>
          <Button htmlType="submit" size="default" type="primary" key="submit" loading={loading}>
            {textSubmit}
          </Button>
        </div>
      </Form>
    </BasicFormWrapper>
  );
};

export default ModalAccount;
