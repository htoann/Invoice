import { API_INVOICES_TAXES_NUMBER } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { Select, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TaxNumberSelect = ({ taxNumber, onChange }) => {
  const { t } = useTranslation();
  const [taxList, setTaxList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTaxList = async (taxNumber = '') => {
    setLoading(true);
    try {
      const response = await dataService.get(API_INVOICES_TAXES_NUMBER, {
        ...(taxNumber && { nbmst: taxNumber }),
      });
      const taxAccounts = response?.data || [];
      setTaxList(taxAccounts);
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Error'),
        description: t('Không thể tải danh sách mã số thuế. Vui lòng thử lại sau.'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTaxList();
  }, []);

  const taxOptions = [
    {
      label: t('Common_All'),
      value: '',
    },
    ...taxList.map((item) => ({
      label: item,
      value: item,
    })),
  ];

  const filterTax = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span className="label">{t('Mã số thuế')}</span>
      <Select
        showSearch
        placeholder={t('Chọn mã số thuế')}
        value={taxNumber}
        onChange={onChange}
        options={taxOptions}
        loading={loading}
        filterOption={filterTax}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default TaxNumberSelect;
