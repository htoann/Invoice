import { ModalCommon } from '@/components/ModalCommon';
import { API_PROVIDERS, dataService } from '@/service';
import { Form, notification } from 'antd';
import { useAppState } from 'context/AppContext';
import { useGetOrgStructure } from 'hooks/useGetOrgStructure';
import { useDivision } from 'hooks/vietnam-division';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fieldsModalProvider } from '../utils';

const CreateProvider = ({ state, setState, list, setList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useGetOrgStructure();

  const { branches } = useAppState();

  const [loading, setLoading] = useState(false);

  const { provinces, districts, communes, setProvinceId, setDistrictId } = useDivision();

  const createNew = async (data) => {
    setLoading(true);
    try {
      const response = await dataService.post(API_PROVIDERS, data);
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
        message: t('Common_Provider'),
        description: t('Common_CreateSuccess'),
      });
      form.resetFields();
    } else {
      notification.error({
        message: t('Common_Provider'),
        description: t('Common_CreateFailure'),
      });
    }
  };

  const onFormValuesChange = (changedValues) => {
    const { province, district } = changedValues;

    if (province) {
      setProvinceId(province);
      form.setFieldsValue({
        district: undefined,
        commune: undefined,
      });
    } else if (district) {
      setDistrictId(district);
      form.setFieldsValue({
        commune: undefined,
      });
    }
  };

  const mapOptions = {
    province: provinces,
    district: districts,
    commune: communes,
    branch: branches,
  };

  const fields = fieldsModalProvider.map((field) => ({
    ...field,
    ...(field.name in mapOptions && { options: mapOptions[field.name] }),
  }));

  const onCancel = () => {
    setState({ ...state, visible: false });
    form.resetFields();
  };

  return (
    <ModalCommon
      width={1000}
      open={state.visible}
      title={t('Provider_Create')}
      form={form}
      handleOk={handleOk}
      onCancel={onCancel}
      loading={loading}
      textSubmit={t('Common_Create')}
      fields={fields}
      onValuesChange={onFormValuesChange}
      size="large"
    />
  );
};

export default CreateProvider;
