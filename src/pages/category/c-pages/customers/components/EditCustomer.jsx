import { ModalCommon } from '@/components/ModalCommon';
import { API_CUSTOMER, dataService } from '@/service';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fieldsModalCustomer } from '../utils';

const EditCustomer = ({ state, setState, list, setList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const handleOk = async (values) => {
    try {
      setLoading(true);

      const response = await dataService.put(API_CUSTOMER(state.update.id), {
        ...values,
        id: state.update.id,
      });
      const updated = response.data;

      const updatedAccounts = list.map((acc) => (acc.id === updated.id ? updated : acc));
      setList(updatedAccounts);

      form.resetFields();
      onCancel();

      notification.success({
        message: t('Common_Customer'),
        description: t('Common_UpdateSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Customer'),
        description: t('Common_UpdateFailure'),
      });
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setState({ ...state, editVisible: false });
    form.resetFields();
  };

  return (
    <ModalCommon
      title={t('Customer_Update')}
      open={state.editVisible}
      form={form}
      handleOk={handleOk}
      onCancel={onCancel}
      loading={loading}
      textSubmit={t('Common_Update')}
      fields={fieldsModalCustomer}
      size="large"
      dataUpdate={state.update}
      width={1000}
    />
  );
};

export default EditCustomer;
