import { Modal } from '@/components/modals/antd-modals';
import { API_PRODUCT, dataService } from '@/service';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalAccount from './Modal';

const EditProduct = ({ state, setState, list, setList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onCancel = () => {
    setState({ ...state, editVisible: false });
    form.resetFields();
  };

  const handleOk = async (values) => {
    try {
      setLoading(true);

      const response = await dataService.put(API_PRODUCT(state.update.id), {
        ...values,
        id: state.update.id,
      });
      const updated = response.data;

      const updatedAccounts = list.map((acc) => (acc.id === updated.id ? updated : acc));
      setList(updatedAccounts);

      form.resetFields();
      onCancel();

      notification.success({
        message: t('Common_Goods'),
        description: t('Product_UpdateSuccessDescription'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Goods'),
        description: t('Product_UpdateErrorDescription'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={t('Product_UpdateTitle')} open={state.editVisible} onCancel={onCancel}>
      <ModalAccount
        form={form}
        handleOk={handleOk}
        state={state}
        onCancel={onCancel}
        loading={loading}
        textSubmit={t('Common_Save')}
      />
    </Modal>
  );
};

export default EditProduct;
