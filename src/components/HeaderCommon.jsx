import { Input } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CustomHeader = ({ title, name, searchParams, setSearchParams, setState }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState(searchParams?.[name] || '');

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      setState((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          current: 1,
        },
      }));
      setSearchParams((prev) => ({ ...prev, [name]: search }));
    }
  };

  return (
    <>
      <div>{t(title)}</div>
      <Input
        style={{ width: 'auto', height: 35, marginTop: 10 }}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
      />
    </>
  );
};

export default CustomHeader;
