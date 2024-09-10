import { ModalCommon } from '@/components/ModalCommon';
import { API_PROVIDER, dataService } from '@/service';
import { Form, notification } from 'antd';
import { useAppState } from 'context/AppContext';
import { useGetOrgStructure } from 'hooks/useGetOrgStructure';
import { useDivision } from 'hooks/vietnam-division';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fieldsModalProvider } from '../utils';

const EditProvider = ({ state, setState, list, setList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useGetOrgStructure();

  const { branches } = useAppState();

  const defaultProvideId = state?.update?.province?.id;
  const defaultDistrictId = state?.update?.district?.id;

  const [loading, setLoading] = useState(false);

  const { provinces, districts, communes, setProvinceId, setDistrictId } = useDivision();

  useEffect(() => {
    if (defaultProvideId) {
      setProvinceId(defaultProvideId);
    }
    if (defaultDistrictId) {
      setDistrictId(defaultDistrictId);
    }
  }, [defaultProvideId, defaultDistrictId]);

  const handleOk = async (values) => {
    setLoading(true);
    try {
      const response = await dataService.put(API_PROVIDER(state.update.id), {
        ...values,
        id: state.update.id,
      });
      const updated = response.data;

      const updatedAccounts = list.map((acc) => (acc.id === updated.id ? updated : acc));
      setList(updatedAccounts);

      form.resetFields();
      onCancel();

      notification.success({
        message: t('Common_Provider'),
        description: t('Common_UpdateSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Provider'),
        description: t('Common_UpdateFailure'),
      });
    } finally {
      setLoading(false);
    }
  };

  const onFormValuesChange = ({ province, district }) => {
    if (province) setProvinceId(province);
    if (district) setDistrictId(district);
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
    setState({ ...state, editVisible: false });
    form.resetFields();
  };

  return (
    <ModalCommon
      width={1000}
      title={t('Provider_Update')}
      open={state.editVisible}
      form={form}
      handleOk={handleOk}
      onCancel={onCancel}
      loading={loading}
      textSubmit={t('Common_Update')}
      fields={fields}
      onValuesChange={onFormValuesChange}
      size="large"
      dataUpdate={state.update}
    />
  );
};

export default EditProvider;
