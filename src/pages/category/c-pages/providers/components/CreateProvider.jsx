import { ModalCommon } from '@/components/ModalCommon';
import { Modal } from '@/components/modals/antd-modals';
import { API_PROVIDERS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { Form, notification } from 'antd';
import useCommunes from 'hooks/vietnam-division/useCommunes';
import useDistricts from 'hooks/vietnam-division/useDistricts';
import useProvinces from 'hooks/vietnam-division/useProvinces';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fieldsModalProvider } from '../utils';

const CreateProvider = ({ state, setState, list, setList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [provinceId, setProvinceId] = useState('');
  const [districtId, setDistrictId] = useState('');

  const { provinces } = useProvinces();
  const { districts } = useDistricts(provinceId);
  const { communes } = useCommunes(districtId);

  const divisionOptions = {
    province: provinces?.map(({ id, name }) => ({ key: id, label: name })),
    district: districts?.map(({ id, name }) => ({ key: id, label: name })),
    ward: communes?.map(({ id, name }) => ({ key: id, label: name })),
  };

  const onCancel = () => {
    setState({ ...state, visible: false });
    form.resetFields();
  };

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

  const fields = fieldsModalProvider.map((field) => ({
    ...field,
    ...((field.name === 'province' || field.name === 'district' || field.name === 'ward') && {
      options: divisionOptions[field.name],
    }),
  }));

  return (
    <Modal type="primary" title={t('Provider_Create')} open={state.visible} onCancel={onCancel}>
      <div className="project-modal">
        <ModalCommon
          form={form}
          handleOk={handleOk}
          onCancel={onCancel}
          loading={loading}
          textSubmit={t('Common_Create')}
          fields={fields}
          onValuesChange={onFormValuesChange}
        />
      </div>
    </Modal>
  );
};

export default CreateProvider;
