import { PageHeader } from '@/components/page-headers/page-headers';
import { LayoutContent } from '@/layout/LayoutContent';
import { API_PROVIDERS } from '@/service';
import { useList } from 'hooks/useListCommon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateProvider from './components/CreateProvider';
import DataTable from './components/DataTable';
import EditProvider from './components/EditProvider';
import useDataTableColumn from './hooks/useDataTableColumn';
import useDataTableSource from './hooks/useDataTableSource';
import { columnDataProvider } from './utils';

const Providers = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    visible: false,
    editVisible: false,
    update: {},
    pagination: { current: 1, pageSize: 20 },
  });
  const [searchParams, setSearchParams] = useState({});

  const { list, loading, getList, setList } = useList(state, setState, API_PROVIDERS, 'nhà cung cấp');

  const { pagination } = state;
  const { current, pageSize } = pagination;

  useEffect(() => {
    getList(searchParams);
  }, [current, pageSize, searchParams]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    getCheckboxProps: (record) => ({
      id: record.id,
    }),
  };

  const tableDataSource = useDataTableSource(list, current, pageSize, setState, setList);
  const dataTableColumn = useDataTableColumn(columnDataProvider, searchParams, setSearchParams, setState);

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_ListProviders')} />
      <LayoutContent borderLessHeading cards cardsProps={{ headless: 'headless' }}>
        <DataTable
          tableData={tableDataSource}
          columns={dataTableColumn}
          rowSelection={rowSelection}
          state={state}
          setState={setState}
          loading={loading}
        />
      </LayoutContent>

      {state.visible && <CreateProvider state={state} setState={setState} list={list} setList={setList} />}

      {state.editVisible && <EditProvider state={state} setState={setState} list={list} setList={setList} />}
    </>
  );
};

export default Providers;
