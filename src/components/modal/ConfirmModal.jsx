import { Button } from '@/components/button';
import { Modal } from '@/components/modal';
import { BasicFormWrapper } from '@/container/style';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

export const ConfirmModal = ({ open, setOpen, onConfirm, loading, description }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Modal title={t('Common_Warning')} open={open} onCancel={() => setOpen(false)} top="200">
      <BasicFormWrapper>
        <Form form={form} name="contactEdit" onFinish={onConfirm} autoComplete="off">
          <div>{description}</div>
          <div style={{ justifyContent: 'end', display: 'flex', marginTop: 20 }}>
            <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={() => setOpen(false)}>
              {t('Common_Cancel')}
            </Button>
            <Button type="primary" htmlType="submit" size="default" key="submit" loading={loading}>
              {t('Common_Continue')}
            </Button>
          </div>
        </Form>
      </BasicFormWrapper>
    </Modal>
  );
};
