import { ModalCommon } from '@/components/ModalCommon';
import { Modal } from '@/components/modals/antd-modals';
import { API_PROVIDER } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { Form, notification } from 'antd';
import useDivision from 'hooks/vietnam-division/useDivision';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fieldsModalProvider } from '../utils';

const EditProvider = ({ state, setState, list, setList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const { branches, provinces, districts, communes, setProvinceId, setDistrictId } = useDivision();

  const handleOk = async (values) => {
    try {
      setLoading(true);

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
        message: t('Common_Providers'),
        description: t('Common_UpdateSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Providers'),
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
    ward: communes,
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
    <Modal title={t('Provider_Update')} open={state.visible} onCancel={onCancel} width="1000px">
      <div className="project-modal">
        <ModalCommon
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
      </div>
    </Modal>
  );
};

export default EditProvider;
