import { Button } from '@/components/buttons/buttons';
import { BasicFormWrapper } from '@/container/styled';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const ModalAccount = ({ form, handleOk, state, onCancel, loading, textSubmit = 'Lưu' }) => {
  const { t } = useTranslation();

  return (
    <BasicFormWrapper>
      <Form form={form} name="edit_account" onFinish={handleOk}>
        <Form.Item initialValue={state?.update?.username} label={t('Mail_Username')} name="username">
          <Input placeholder={t('Mail_Username_Placeholder')} />
        </Form.Item>

        <Form.Item
          label={t('Mail_Email')}
          name="email"
          rules={[{ message: t('Vui lòng nhập địa chỉ email!'), type: 'email', required: true }]}
          initialValue={state?.update.email}
        >
          <Input placeholder="name@example.com" />
        </Form.Item>

        <Form.Item
          initialValue={state?.update?.password}
          name="password"
          label={t('Common_Password')}
          rules={[{ required: true, message: t('Vui lòng nhập mật khẩu') }]}
        >
          <Input.Password placeholder={t('Common_Password_Placeholder')} />
        </Form.Item>

        <div style={{ justifyContent: 'end', display: 'flex' }}>
          <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={onCancel}>
            {t('Common_Cancel')}
          </Button>
          <Button htmlType="submit" size="default" type="primary" key="submit" loading={loading}>
            {t(textSubmit)}
          </Button>
        </div>
      </Form>
    </BasicFormWrapper>
  );
};

export default ModalAccount;
