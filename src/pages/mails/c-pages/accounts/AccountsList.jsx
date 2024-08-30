/* eslint-disable no-unused-vars */
import { Button, Col, notification, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { BorderLessHeading, Main } from '@/container/styled';
import { useProjects } from '@/pages/category/c-pages/organization/hook/useProjects';
import { API_MAILS_ACCOUNT_BY_ACCOUNT_ID, API_MAILS_ACCOUNTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useGetAllDepartments } from 'hooks/useGetAllDepartments';
import { CreateAccount } from './components/CreateAccount';
import { DataTable } from './components/DataTable';
import { FilterHeader } from './components/FilterHeader';
import { UpdateAccount } from './components/UpdateAccount';
import { useTableDataSource } from './hooks/useDataSource';
import { useTableColumnAccount } from './hooks/useDataTable';

const AccountList = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    visible: false,
    editVisible: false,
    update: {},
    pagination: { current: 1, pageSize: 20 },
  });

  const { pagination, visible, editVisible } = state;
  const { current, pageSize } = pagination;

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ name: '', email: '', departmentId: '', projectId: '' });

  const { departmentId } = searchParams || {};
  const { loadingDepartments, departments } = useGetAllDepartments();
  const { projects, loadingProjects } = useProjects(null, departmentId);

  const getList = async () => {
    setLoading(true);
    try {
      const response = await dataService.get(API_MAILS_ACCOUNTS, {
        page: current,
        page_size: pageSize,
        ...Object.fromEntries(Object.entries(searchParams).filter(([_, v]) => v)),
      });

      if (response?.data) {
        setAccounts(response?.data?.results);
        setState((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: Number(response?.data?.count) || 0,
          },
        }));
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách tài khoản. Vui lòng thử lại sau.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
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
    departments,
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

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Mail_AccountList_Title')} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards>
                <FilterHeader
                  departments={departments}
                  projects={projects}
                  loadingDepartments={loadingDepartments}
                  loadingProjects={loadingProjects}
                  searchParams={searchParams}
                  handleFilterChange={handleFilterChange}
                />
                <Button onClick={showModal} type="primary" key="1">
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

      {visible && (
        <CreateAccount
          state={state}
          setState={setState}
          accounts={accounts}
          setAccounts={setAccounts}
          departments={departments}
        />
      )}

      {editVisible && (
        <UpdateAccount
          state={state}
          setState={setState}
          accounts={accounts}
          setAccounts={setAccounts}
          departments={departments}
        />
      )}
    </>
  );
};

export default AccountList;
