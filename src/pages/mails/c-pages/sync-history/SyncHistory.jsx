import { PageHeader } from '@/components/page-headers';
import { LayoutContent } from '@/layout/LayoutContent';
import { API_MAIL_TASK_HISTORIES } from '@/service';
import { useList } from 'hooks/useListCommon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from './components/DataTable';
import { useTableColumnSyncHistory } from './hooks/useDataTable';
import { useTableDataSource } from './hooks/useTableDataSource';

const SyncHistory = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    pagination: { current: 1, pageSize: 20 },
  });

  const { pagination } = state;
  const { current, pageSize } = pagination;

  const { list, loading, getList } = useList(state, setState, API_MAIL_TASK_HISTORIES, 'lịch sử đồng bộ');

  useEffect(() => {
    getList();
  }, [current, pageSize]);

  const tableDataSource = useTableDataSource(list, current, pageSize);

  const dataTableColumn = useTableColumnSyncHistory();

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_SyncHistory')} />
      <LayoutContent borderLessHeading cards cardsProps={{ headless: 'headless' }}>
        <DataTable
          tableData={tableDataSource}
          columns={dataTableColumn}
          pagination={pagination}
          setState={setState}
          loading={loading}
        />
      </LayoutContent>
    </>
  );
};

export default SyncHistory;
