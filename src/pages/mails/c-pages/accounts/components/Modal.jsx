import { Button } from '@/components/buttons/buttons';
import { BasicFormWrapper } from '@/container/styled';
import i18n from '@/i18n/config';
import { useProjects } from '@/pages/category/c-pages/organization/hook/useProjects';
import { Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const locale = i18n.language;

export const ModalAccount = ({ form, handleOk, state, onCancel, loading, textSubmit, departments }) => {
  const { t } = useTranslation();

  const [selectedDepartmentId, setSelectedDepartmentId] = useState();

  const { projects } = useProjects(null, selectedDepartmentId);

  useEffect(() => {
    form.setFieldValue('project', undefined);
  }, [selectedDepartmentId]);

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
          name="department"
          initialValue={state?.update?.department || undefined}
          label={t('Common_Department')}
          rules={[{ required: true, message: t('Department_PleaseSelect') }]}
        >
          <Select placeholder={t('Department_PleaseSelect')} onChange={(value) => setSelectedDepartmentId(value)}>
            {departments?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="project" initialValue={state?.update?.project || undefined} label={t('Common_Project')}>
          <Select placeholder={t('Common_SelectProject')}>
            {projects?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
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
          <Input disabled={state?.update.email} placeholder="name@example.com" autoComplete="email" />
        </Form.Item>

        <Form.Item
          name="password"
          initialValue={state?.update?.password}
          label={t('Common_AppPassword')}
          rules={[{ required: true, message: t('Common_PleaseEnterPassword') }]}
        >
          <Input.Password
            disabled={state?.update.password}
            placeholder="xczh qecu sgjk ibjy"
            autoComplete="app-password"
          />
        </Form.Item>

        {!state?.update?.password && (
          <>
            <p>* {t('Mail_NoticeAppPassword')}</p>
            <a
              href={`https://support.google.com/mail/answer/185833?hl=${locale}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Mail_HowToCreateAppPassword')}
            </a>
          </>
        )}

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