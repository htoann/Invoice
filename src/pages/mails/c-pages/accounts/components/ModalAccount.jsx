import { Button } from '@/components/buttons';
import { Modal } from '@/components/modals';
import { BasicFormWrapper } from '@/container/styled';
import i18n from '@/i18n/config';
import { Form, Input, Select } from 'antd';
import { useAppState } from 'context/AppContext';
import { useGetOrgStructure } from 'hooks/useGetOrgStructure';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const locale = i18n.language;

export const ModalAccount = ({ form, handleOk, state, onCancel, loading, textSubmit, title, open }) => {
  const { t } = useTranslation();

  const { branch, department, project, name, email, password } = state?.update || {};

  useGetOrgStructure({ visible: open, editVisible: open }, true, open);

  const {
    branches,
    selectedBranchId,
    setSelectedBranchId,
    departments,
    selectedDepartmentId,
    setSelectedDepartmentId,
    projects,
  } = useAppState();

  useEffect(() => {
    branch?.id && setSelectedBranchId(branch.id);
    department?.id && setSelectedDepartmentId(department.id);
  }, [branch?.id, department?.id]);

  return (
    <Modal title={title} open={open} onCancel={onCancel}>
      <BasicFormWrapper>
        <Form form={form} name="edit_account" onFinish={handleOk} autoComplete="off">
          <Form.Item
            name="name"
            initialValue={name}
            label={t('Common_AccountName')}
            rules={[{ message: t('Common_PleaseEnterAccountName'), required: true }]}
          >
            <Input placeholder={t('Common_EnterAccountName')} autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="branch"
            label={t('Common_Branch')}
            rules={[{ required: true, message: t('Branch_PleaseSelect') }]}
            initialValue={branch?.id || undefined}
          >
            <Select
              placeholder={t('Branch_PleaseSelect')}
              onChange={(value) => {
                setSelectedBranchId(value);
                form.setFieldValue('department', undefined);
                form.setFieldValue('project', undefined);
              }}
            >
              {branches?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="department"
            initialValue={department?.id || undefined}
            label={t('Common_Department')}
            rules={[{ required: true, message: t('Department_PleaseSelect') }]}
          >
            <Select
              disabled={!selectedBranchId}
              placeholder={t('Department_PleaseSelect')}
              onChange={(value) => {
                setSelectedDepartmentId(value);
                form.setFieldValue('project', undefined);
              }}
            >
              {departments?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="project"
            initialValue={project?.id || undefined}
            label={t('Common_Project')}
            rules={[{ required: true, message: t('Project_PleaseSelect') }]}
          >
            <Select disabled={!selectedDepartmentId} placeholder={t('Common_SelectProject')}>
              {projects?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            initialValue={email}
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
            initialValue={password}
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
    </Modal>
  );
};
