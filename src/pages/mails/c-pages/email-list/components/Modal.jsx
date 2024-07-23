import { Button } from '@/components/buttons/buttons';
import { BasicFormWrapper } from '@/container/styled';
import { Form, Input, Select } from 'antd';
import useDepartments from 'hooks/useDepartments';
import { useTranslation } from 'react-i18next';

const ModalAccount = ({ form, handleOk, state, onCancel, loading, textSubmit }) => {
  const { t } = useTranslation();

  const { loadingDepartments, departments } = useDepartments();
  return (
    <BasicFormWrapper>
      <Form form={form} name="edit_account" onFinish={handleOk}>
        <Form.Item
          initialValue={state?.update?.username}
          label={t('Common_AccountName')}
          name="username"
          rules={[{ message: t('Common_PleaseEnterAccountName'), required: true }]}
        >
          <Input placeholder={t('Common_EnterAccountName')} />
        </Form.Item>

        <Form.Item
          label={t('Common_Email')}
          name="email"
          rules={[
            {
              message: t('Common_PleaseEnterEmail'),
              type: 'email',
              required: true,
            },
          ]}
          initialValue={state?.update.email}
        >
          <Input placeholder="name@example.com" />
        </Form.Item>

        <Form.Item
          initialValue={state?.update?.password}
          name="password"
          label={t('Common_Password')}
          rules={[{ required: true, message: t('Common_PleaseEnterPassword') }]}
        >
          <Input.Password placeholder={t('Common_EnterPassword')} />
        </Form.Item>

        <Form.Item
          label={t('Common_Department')}
          name="department_id"
          initialValue={state?.update?.departmentId}
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
