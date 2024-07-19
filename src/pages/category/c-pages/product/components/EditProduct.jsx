import { Modal } from '@/components/modals/antd-modals';
import axios from '@/mock/index';
import { Form, notification } from 'antd';
import { useState } from 'react';
import ModalAccount from './Modal';

const UpdateProduct = ({ state, setState, list, setList }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onCancel = () => {
    setState((prevState) => ({
      ...prevState,
      editVisible: false,
    }));
    form.resetFields();
  };

  const handleOk = async (values) => {
    try {
      setLoading(true);

      const response = await axios.put(`/products/${state.update.id}`, { ...values, id: state.update.id });
      const updated = response.data;

      const updatedAccounts = list.map((acc) => (acc.id === updated.id ? updated : acc));
      setList(updatedAccounts);

      form.resetFields();
      onCancel();

      notification.success({
        message: 'Cập nhật thành công',
        description: 'Thông tin hàng hoá đã được cập nhật thành công.',
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Cập nhật thất bại',
        description: 'Không thể cập nhật thông tin hàng hoá. Vui lòng thử lại.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal type={state.modalType} title="Cập nhật hàng hoá" open={state.editVisible} footer={null} onCancel={onCancel}>
      <ModalAccount
        form={form}
        handleOk={handleOk}
        state={state}
        onCancel={onCancel}
        loading={loading}
        textSubmit="Lưu"
      />
    </Modal>
  );
};

export default UpdateProduct;
