/* eslint-disable no-unused-vars */
import { Button, Col, notification, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Cards } from '@/components/cards/frame/cards-frame';
import { FilterOrgStructure } from '@/components/FilterOrgStructure';
import { PageHeader } from '@/components/page-headers/page-headers';
import { BorderLessHeading, Main } from '@/container/styled';
import { API_MAILS_ACCOUNT_BY_ACCOUNT_ID, API_MAILS_ACCOUNTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useAppState } from 'context/AppContext';
import { useGetOrgStructure } from 'hooks/useGetOrgStructure';
import { useList } from 'hooks/useListCommon';
import { CreateAccount } from './components/CreateAccount';
import { DataTable } from './components/DataTable';
import { UpdateAccount } from './components/UpdateAccount';
import { useTableDataSource } from './hooks/useDataSource';
import { useTableColumnAccount } from './hooks/useDataTable';

const AccountList = () => {
  const { t } = useTranslation();

  useGetOrgStructure();

  const { setSelectedBranchId, setSelectedDepartmentId, setSelectedProjectId } = useAppState();

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

  useEffect(() => {
    searchParams?.departmentId && setSelectedDepartmentId(searchParams?.departmentId);
  }, [searchParams?.departmentId]);

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
    setSearchParams((prevParams) => ({ ...prevParams, [key]: value }));
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

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Mail_AccountList_Title')} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards>
                <FilterOrgStructure
                  onChangeBranch={handleChangeBranch}
                  onChangeDepartment={handleChangeDepartment}
                  onChangeProject={handleChangeProject}
                  branchId={searchParams?.branchId}
                  departmentId={searchParams?.departmentId}
                  projectId={searchParams?.projectId}
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
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>

      {visible && <CreateAccount state={state} setState={setState} accounts={accounts} setAccounts={setAccounts} />}

      {editVisible && <UpdateAccount state={state} setState={setState} accounts={accounts} setAccounts={setAccounts} />}
    </>
  );
};

export default AccountList;
