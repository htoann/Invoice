import { Modal } from '@/components/modals/antd-modals';
import axios from '@/mock/index';
import { Form, notification } from 'antd';
import { useState } from 'react';
import ModalHangHoa from './Modal';

function CreateProduct({ state, setState, list, setList }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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
        message: 'Thành công',
        description: 'Hàng hoá đã được tạo thành công',
      });
      form.resetFields();
    } else {
      notification.error({
        message: 'Lỗi',
        description: 'Đã xảy ra lỗi khi tạo hàng hoá',
      });
    }
  };

  return (
    <div>
      <Modal type="primary" title="Tạo hàng hoá" open={state.visible} footer={null} onCancel={onCancel}>
        <div className="project-modal">
          <ModalHangHoa form={form} handleOk={handleOk} onCancel={onCancel} loading={loading} textSubmit="Tạo" />
        </div>
      </Modal>
    </div>
  );
}

export default CreateProduct;
