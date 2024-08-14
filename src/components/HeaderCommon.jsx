import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

const CustomHeader = ({
  title,
  name,
  searchParams,
  setSearchParams,
  getList,
  state,
  setState,
  pagination,
  pageSize,
}) => {
  const { t } = useTranslation();

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div>{t(title)}</div>
      <Input
        style={{ width: 'auto', height: 35, marginTop: 10 }}
        onClick={stopPropagation}
        onFocus={stopPropagation}
        value={searchParams[name]}
        onChange={(e) => {
          stopPropagation(e);
          setSearchParams({ ...searchParams, [name]: e.target.value.toLowerCase() });
        }}
        onKeyDown={(e) => {
          stopPropagation(e);
          if (e.key === 'Enter') {
            setState({
              ...state,
              pagination: { ...pagination, current: 1 },
            });
            getList({ ...searchParams, shouldLoading: false, page_size: pageSize });
          }
        }}
      />
    </>
  );
};

export default CustomHeader;
