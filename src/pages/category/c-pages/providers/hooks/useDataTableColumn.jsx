import CustomHeader from '@/components/HeaderCommon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const useDataTableColumn = (columnDataProvider, searchParams, setSearchParams, setState) => {
  const { t } = useTranslation();

  const dataTableColumn = useMemo(() => {
    return columnDataProvider.map((col) => ({
      title:
        col.key === 'stt' || col.key === 'action' ? (
          t(col.title)
        ) : (
          <CustomHeader
            title={col.title}
            name={col.dataIndex}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setState={setState}
          />
        ),
      dataIndex: col.dataIndex,
      key: col.key,
      sorter:
        col.key !== 'stt' && col.key !== 'action'
          ? (a, b) => a?.[col.dataIndex]?.props?.children?.localeCompare(b?.[col.dataIndex]?.props?.children)
          : false,
      fixed: col?.fixed,
      className: col.key === 'stt' || col.key === 'action' ? '' : 'searchInput',
      width: col?.width,
    }));
  }, [columnDataProvider, searchParams, setSearchParams, setState, t]);

  return dataTableColumn;
};

export default useDataTableColumn;
