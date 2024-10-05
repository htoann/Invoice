import { Button } from '@/components/buttons';
import { Modal } from '@/components/modals';
import { BasicFormWrapper } from '@/container/styled';
import { API_MAILS_ACCOUNT_BY_ACCOUNT_ID, dataService } from '@/service';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalAccount } from './ModalAccount';

export const UpdateAccount = ({ state, setState, getList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onCancel = () => {
    setState({ ...state, editVisible: false });
    form.resetFields();
  };

  const handleOk = async (values) => {
    if (values?.password !== state?.update?.password && !showConfirm) {
      setShowConfirm(true);
      return;
    }

    try {
      setLoading(true);
      await dataService.put(API_MAILS_ACCOUNT_BY_ACCOUNT_ID(state.update.id), values);
      getList();
      form.resetFields();
      onCancel();
      notification.success({
        message: t('Common_Success'),
        description: t('Mail_UpdateAccount_Success'),
      });
    } catch (err) {
      console.error(err);
      const errMsg =
        err?.response?.data?.errors?.code === 'duplicated_email'
          ? t('Common_DuplicatedEmailAccount')
          : t('Auth_Failed_Credential');
      notification.error({
        message: t('Common_Error'),
        description: errMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalAccount
        title={t('Mail_UpdateAccount_Title')}
        open={state.editVisible}
        form={form}
        handleOk={handleOk}
        state={state}
        onCancel={onCancel}
        loading={loading && !showConfirm}
        textSubmit={t('Common_Save')}
      />

      <Modal title={t('Common_Warning')} open={showConfirm} onCancel={() => setShowConfirm(false)} top="200">
        <BasicFormWrapper>
          <Form form={form} name="contactEdit" onFinish={handleOk} autoComplete="off">
            {t('Mail_UpdatePasswordWarning')}
            <div style={{ justifyContent: 'end', display: 'flex' }}>
              <Button
                size="default"
                type="white"
                outlined
                style={{ marginRight: 8 }}
                onClick={() => setShowConfirm(false)}
              >
                {t('Common_Cancel')}
              </Button>
              <Button type="primary" htmlType="submit" size="default" key="submit" loading={loading}>
                {t('Common_Continue')}
              </Button>
            </div>
          </Form>
        </BasicFormWrapper>
      </Modal>
    </>
  );
};
