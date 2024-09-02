import { API_INVOICES_TAXES_NUMBER } from '@/utils/apiConst';
import { Select } from 'antd';
import { useList } from 'hooks/useListCommon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TaxNumberSelect = ({ taxNumber, onChange }) => {
  const { t } = useTranslation();
  const [taxList, setTaxList] = useState([]);

  const handleResponse = (response) => {
    const taxAccounts = response?.data || [];
    setTaxList(taxAccounts);
  };

  const { loading, getList } = useList(null, null, API_INVOICES_TAXES_NUMBER, 'mã số thuế', handleResponse);

  useEffect(() => {
    getList();
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
