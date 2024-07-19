import { Modal } from '@/components/modals/antd-modals';
import axios from '@/mock/index';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalHangHoa from './Modal';

function CreateProduct({ state, setState, list, setList }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onCancel = () => {
    setState({ ...state, visible: false });
    form.resetFields();
  };

  const createNew = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('/products', data);
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
        message: t('Common_Success'),
        description: t('Product_Create_Success'),
      });
      form.resetFields();
    } else {
      notification.error({
        message: t('Common_Error'),
        description: t('Product_Create_Error'),
      });
    }
  };

  return (
    <div>
      <Modal type="primary" title={t('Product_Create_Title')} open={state.visible} footer={null} onCancel={onCancel}>
        <div className="project-modal">
          <ModalHangHoa
            form={form}
            handleOk={handleOk}
            onCancel={onCancel}
            loading={loading}
            textSubmit={t('Common_Create')}
          />
        </div>
      </Modal>
    </div>
  );
}

export default CreateProduct;
