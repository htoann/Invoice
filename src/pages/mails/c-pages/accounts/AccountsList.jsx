import { Button } from '@/components/buttons';
import { FilterOrgStructure } from '@/components/FilterOrgStructure';
import { PageHeader } from '@/components/page-headers';
import { LayoutContent } from '@/layout/LayoutContent';
import { routes } from '@/routes/const';
import { API_MAILS_ACCOUNT_BY_ACCOUNT_ID, API_MAILS_ACCOUNTS, dataService } from '@/service';
import { notification } from 'antd';
import { useAppState } from 'context/AppContext';
import { useGetOrgStructure, useList } from 'hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CreateAccount } from './components/CreateAccount';
import { DataTable } from './components/DataTable';
import { UpdateAccount } from './components/UpdateAccount';
import { useTableDataSource } from './hooks/useDataSource';
import { useTableColumnAccount } from './hooks/useDataTable';

const AccountList = () => {
  const { t } = useTranslation();

  const {
    selectedBranchId,
    setSelectedBranchId,
    selectedDepartmentId,
    setSelectedDepartmentId,
    setSelectedProjectId,
    selectedProjectId,
  } = useAppState();

  const [state, setState] = useState({
    visible: false,
    editVisible: false,
    update: {},
    pagination: { current: 1, pageSize: 20 },
  });

  const [searchParams, setSearchParams] = useState({
    name: '',
    email: '',
    branchId: '',
    departmentId: '',
    projectId: '',
  });

  const { pagination, visible, editVisible } = state;
  const { current, pageSize } = pagination;

  useGetOrgStructure(state, true, !visible && !editVisible);

  const { branchId, departmentId, projectId } = searchParams || {};

  useEffect(() => {
    if (!visible && !editVisible) {
      branchId && setSelectedBranchId(branchId);
      departmentId && setSelectedDepartmentId(departmentId);
      projectId && setSelectedProjectId(projectId);
    }
  }, [
    selectedBranchId,
    selectedDepartmentId,
    selectedProjectId,
    branchId,
    departmentId,
    projectId,
    visible,
    editVisible,
  ]);

  const {
    list: accounts,
    loading,
    getList,
    setList: setAccounts,
  } = useList(state, setState, API_MAILS_ACCOUNTS, 'tài khoản');

  useEffect(() => {
    getList(searchParams);
  }, [current, pageSize, searchParams]);

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      update: data,
    });
  };

  const handleDelete = async (id) => {
    try {
      await dataService.delete(API_MAILS_ACCOUNT_BY_ACCOUNT_ID(id));
      setAccounts(accounts.filter((account) => account.id !== id));
      notification.success({
        message: t('Mail_AccountList_Title'),
        description: t('Mail_EmailList_DeleteSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Mail_AccountList_Title'),
        description: t('Mail_EmailList_DeleteError'),
      });
    }
  };

  const tableDataSource = useTableDataSource({
    accounts,
    current,
    pageSize,
    showEditModal,
    handleDelete,
  });

  const dataTableColumn = useTableColumnAccount({
    searchParams,
    setSearchParams,
    setState,
  });

  const handleFilterChange = (key, value) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangeBranch = (branchId) => {
    handleFilterChange('branchId', branchId);
    handleFilterChange('departmentId', '');
    handleFilterChange('projectId', '');

    setSelectedBranchId(branchId);
    setSelectedDepartmentId('');
    setSelectedProjectId('');
  };

  const handleChangeDepartment = (departmentId) => {
    handleFilterChange('departmentId', departmentId);
    handleFilterChange('projectId', '');

    setSelectedDepartmentId(departmentId);
    setSelectedProjectId('');
  };

  const handleChangeProject = (projectId) => {
    handleFilterChange('projectId', projectId);
    setSelectedProjectId(projectId);
  };

  const pageRoutes = [
    { path: routes.emailAccount, breadcrumbName: t('Common_Inbox') },
    { path: routes.emailAccount, breadcrumbName: t('Mail_AccountList_Title') },
  ];

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Mail_AccountList_Title')} routes={pageRoutes} />
      <LayoutContent borderLessHeading cards>
        <FilterOrgStructure
          onChangeBranch={handleChangeBranch}
          onChangeDepartment={handleChangeDepartment}
          onChangeProject={handleChangeProject}
          branchId={searchParams?.branchId}
          departmentId={searchParams?.departmentId}
          projectId={searchParams?.projectId}
          needTakeDefaultValue
        />
        <Button onClick={showModal} type="primary" key="1" style={{ marginTop: 25 }}>
          <Link to="#">+ {t('Mail_AccountList_Create')}</Link>
        </Button>
        <DataTable
          tableData={tableDataSource}
          columns={dataTableColumn}
          pagination={pagination}
          setState={setState}
          loading={loading}
        />
      </LayoutContent>
      {visible && <CreateAccount state={state} setState={setState} getList={() => getList(searchParams)} />}
      {editVisible && <UpdateAccount state={state} setState={setState} getList={() => getList(searchParams)} />}
    </>
  );
};

export default AccountList;
