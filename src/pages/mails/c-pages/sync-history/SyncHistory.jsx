import { FilterOrgStructureHeader } from '@/components/FilterOrgStructureHeader';
import { PageHeader } from '@/components/page-headers';
import { LayoutContent } from '@/layout/LayoutContent';
import { routes } from '@/routes/const';
import { API_MAIL_TASK_HISTORIES } from '@/service';
import { useAppState } from 'context/AppContext';
import { useGetOrgStructure } from 'hooks';
import { useList } from 'hooks/useListCommon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from './components/DataTable';
import { useTableColumnSyncHistory } from './hooks/useDataTable';
import { useTableDataSource } from './hooks/useTableDataSource';

const SyncHistory = () => {
  const { t } = useTranslation();
  const { selectedBranchId, selectedDepartmentId, selectedProjectId } = useAppState();

  useGetOrgStructure();

  const [state, setState] = useState({
    pagination: { current: 1, pageSize: 20 },
  });

  const { pagination } = state;
  const { current, pageSize } = pagination;

  const { list, loading, getList } = useList(state, setState, API_MAIL_TASK_HISTORIES, 'lịch sử đồng bộ');

  useEffect(() => {
    getList({ branchId: selectedBranchId, departmentId: selectedDepartmentId, projectId: selectedProjectId });
  }, [current, pageSize, selectedBranchId, selectedDepartmentId, selectedProjectId]);

  const tableDataSource = useTableDataSource(list, current, pageSize);

  const dataTableColumn = useTableColumnSyncHistory();

  const handleReset = () => {
    setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
    }));
  };

  const pageRoutes = [
    { path: routes.emailSync, breadcrumbName: t('Common_Inbox') },
    { path: routes.emailSync, breadcrumbName: t('Common_SyncHistory') },
  ];

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_SyncHistory')} routes={pageRoutes} />
      <LayoutContent borderLessHeading cards>
        <FilterOrgStructureHeader handleReset={handleReset} />

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
