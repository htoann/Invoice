import { ModalCommon } from '@/components/ModalCommon';
import { API_PRODUCTS, dataService } from '@/service';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fieldsModalProduct } from './../utils';

const CreateProduct = ({ state, setState, list, setList }) => {
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
      const response = await dataService.post(API_PRODUCTS, data);
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
        message: t('Common_Goods'),
        description: t('Product_CreateSuccess'),
      });
      form.resetFields();
    } else {
      notification.error({
        message: t('Common_Goods'),
        description: t('Product_CreateError'),
      });
    }
  };

  return (
    <ModalCommon
      title={t('Product_Create_Title')}
      open={state.visible}
      form={form}
      handleOk={handleOk}
      onCancel={onCancel}
      loading={loading}
      textSubmit={t('Common_Create')}
      fields={fieldsModalProduct}
    />
  );
};

export default CreateProduct;
