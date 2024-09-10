import { ModalCommon } from '@/components/ModalCommon';
import { Modal } from '@/components/modals';
import { API_CUSTOMERS, dataService } from '@/service';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fieldsModalCustomer } from '../utils';

const CreateCustomer = ({ state, setState, list, setList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const createNew = async (data) => {
    setLoading(true);
    try {
      const response = await dataService.post(API_CUSTOMERS, data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async (values) => {
    const newItem = await createNew(values);
    if (newItem) {
      setList([newItem, ...list]);
      onCancel();
      notification.success({
        message: t('Common_Customer'),
        description: t('Common_CreateSuccess'),
      });
      form.resetFields();
    } else {
      notification.error({
        message: t('Common_Customer'),
        description: t('Common_CreateFailure'),
      });
    }
  };

  const onCancel = () => {
    setState({ ...state, visible: false });
    form.resetFields();
  };

  return (
    <Modal title={t('Customer_Create')} open={state.visible} onCancel={onCancel} width={1000}>
      <div className="project-modal">
        <ModalCommon
          form={form}
          handleOk={handleOk}
          onCancel={onCancel}
          loading={loading}
          textSubmit={t('Common_Create')}
          fields={fieldsModalCustomer}
          size="large"
        />
      </div>
    </Modal>
  );
};

export default CreateCustomer;
