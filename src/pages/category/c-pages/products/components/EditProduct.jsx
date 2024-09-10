import { ModalCommon } from '@/components/ModalCommon';
import { API_PRODUCT, dataService } from '@/service';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fieldsModalProduct } from './../utils';

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
    <ModalCommon
      title={t('Product_UpdateTitle')}
      open={state.editVisible}
      form={form}
      handleOk={handleOk}
      dataUpdate={state.update}
      onCancel={onCancel}
      loading={loading}
      textSubmit={t('Common_Save')}
      fields={fieldsModalProduct}
    />
  );
};

export default EditProduct;
