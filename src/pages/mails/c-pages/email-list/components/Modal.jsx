/* eslint-disable no-unused-vars */
import { Button } from '@/components/buttons/buttons';
import { BasicFormWrapper } from '@/container/styled';
import { Form, Input } from 'antd';
import useDepartments from 'hooks/useDepartments';
import { useTranslation } from 'react-i18next';

const ModalAccount = ({ form, handleOk, state, onCancel, loading, textSubmit }) => {
  const { t } = useTranslation();
  const { loadingDepartments, departments } = useDepartments();

  return (
    <BasicFormWrapper>
      <Form form={form} name="edit_account" onFinish={handleOk} autoComplete="off">
        <Form.Item
          name="name"
          initialValue={state?.update?.name}
          label={t('Common_AccountName')}
          rules={[{ message: t('Common_PleaseEnterAccountName'), required: true }]}
        >
          <Input placeholder={t('Common_EnterAccountName')} autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="email"
          initialValue={state?.update.email}
          label={t('Common_Email')}
          rules={[
            {
              message: t('Common_PleaseEnterEmail'),
              type: 'email',
              required: true,
            },
          ]}
        >
          <Input placeholder="name@example.com" autoComplete="email" />
        </Form.Item>
        <Form.Item
          name="password"
          initialValue={state?.update?.password}
          label={t('Common_AppPassword')}
          rules={[{ required: true, message: t('Common_PleaseEnterPassword') }]}
        >
          <Input.Password placeholder="xczh qecu sgjk ibjy" autoComplete="app-password" />
        </Form.Item>
        {!state?.update?.password && (
          <>
            <p>* {t('Lưu ý rằng mật khẩu ứng dụng khác với mật khẩu email')}</p>
            <a href="https://support.google.com/mail/answer/185833" target="_blank" rel="noopener noreferrer">
              {t('Cách tạo mật khẩu ứng dụng')}
            </a>
          </>
        )}
        {/* 
        <Form.Item
          name="department_id"
          initialValue={state?.update?.departmentId}
          label={t('Common_Department')}
          rules={[{ required: true, message: t('Department_PleaseSelect') }]}
        >
          {departments?.length > 0 && (
            <Select
              loading={loadingDepartments}
              disabled={loadingDepartments}
              defaultValue={state?.update.departmentId || departments[0]?.id}
            >
              {departments.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item> */}
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
