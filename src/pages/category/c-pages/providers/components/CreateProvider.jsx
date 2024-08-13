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

  const provincesOption = provinces?.map((province) => ({
    key: province.id,
    label: province.name,
  }));

  const districtsOption = districts?.map((district) => ({
    key: district.id,
    label: district.name,
  }));

  const communesOption = communes?.map((commune) => ({
    key: commune.id,
    label: commune.name,
  }));

  const onCancel = () => {
    setState({ ...state, visible: false });
    form.resetFields();
  };

  const createNew = async (data) => {
    try {
      setLoading(true);
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

  const fields = fieldsModalProvider.map((field) => {
    if (field.name === 'province') {
      return {
        ...field,
        options: provincesOption,
      };
    }
    if (field.name === 'district') {
      return {
        ...field,
        options: districtsOption,
      };
    }
    if (field.name === 'ward') {
      return {
        ...field,
        options: communesOption,
      };
    }
    return field;
  });

  const onFormValuesChange = (changedValues) => {
    if (changedValues?.province) {
      setProvinceId(changedValues?.province);
    }
    if (changedValues?.district) {
      setDistrictId(changedValues?.district);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default CreateProvider;
