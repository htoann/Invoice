import { ModalCommon } from '@/components/ModalCommon';
import { Modal } from '@/components/modals/antd-modals';
import { API_CUSTOMERS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { Form, notification } from 'antd';
import useDivision from 'hooks/vietnam-division/useDivision';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fieldsModalProvider } from '../utils';

const CreateCustomer = ({ state, setState, list, setList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const { branches, provinces, districts, communes, setProvinceId, setDistrictId } = useDivision();

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
        message: t('Common_Providers'),
        description: t('Common_CreateSuccess'),
      });
      form.resetFields();
    } else {
      notification.error({
        message: t('Common_Providers'),
        description: t('Common_CreateFailure'),
      });
    }
  };

  const onFormValuesChange = ({ province, district }) => {
    if (province) setProvinceId(province);
    if (district) setDistrictId(district);
  };

  const mapOptions = {
    province: provinces,
    district: districts,
    ward: communes,
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
    <Modal title={t('Provider_Create')} open={state.visible} onCancel={onCancel} width="1000px">
      <div className="project-modal">
        <ModalCommon
          form={form}
          handleOk={handleOk}
          onCancel={onCancel}
          loading={loading}
          textSubmit={t('Common_Create')}
          fields={fields}
          onValuesChange={onFormValuesChange}
          size="large"
        />
      </div>
    </Modal>
  );
};

export default CreateCustomer;