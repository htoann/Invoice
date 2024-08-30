/* eslint-disable no-unused-vars */
import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { BorderLessHeading, Main } from '@/container/styled';
import useProjects from '@/pages/category/c-pages/organization/hook/useProjects';
import { API_MAILS_ACCOUNT_BY_ACCOUNT_ID, API_MAILS_ACCOUNTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Col, notification, Popconfirm, Row, Select, Skeleton } from 'antd';
import useGetAllDepartments from 'hooks/useGetAllDepartments';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import DataTable from './components/DataTable';
import UpdateAccount from './components/UpdateAccount';
import useDataTable from './hooks/useDataTable';

const EmailList = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    visible: false,
    editVisible: false,
    update: {},
    pagination: { current: 1, total: 0 },
  });

  const { pagination } = state;
  const { current, pageSize } = pagination;

  const [accounts, setAccounts] = useState([]);
  const [isLoadingGetList, setIsLoadingGetList] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ name: '', password: '', departmentId: '' });

  const { departmentId } = searchParams || {};

  const { loadingDepartments, departments } = useGetAllDepartments();
  const { projects, loadingProjects } = useProjects(null, departmentId);

  const getList = async ({
    name = '',
    email = '',
    departmentId = '',
    page = 1,
    page_size = 20,
    searchLoading = true,
  } = {}) => {
    try {
      searchLoading ? setSearchLoading(true) : setIsLoadingGetList(true);

      const response = await dataService.get(API_MAILS_ACCOUNTS, {
        ...(name && { name }),
        ...(email && { email }),
        page,
        page_size,
        department_id: departmentId,
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
      searchLoading ? setSearchLoading(false) : setIsLoadingGetList(false);
    }
  };

  useEffect(() => {
    getList({ ...searchParams, page: current, page_size: pageSize });
  }, [current, pageSize]);

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

  const tableDataSource = [];

  if (accounts?.length > 0) {
    accounts.map((item, index) => {
      const { id, name, email, department } = item;

      return tableDataSource.push({
        key: id,
        stt: (current - 1) * pageSize + index + 1,
        id,
        name: <span>{name}</span>,
        email: <span>{email}</span>,
        department: <span>{departments?.find((item) => item.id === department)?.name}</span>,
        action: (
          <div className="table-actions">
            <Link className="edit" to="#" onClick={() => showEditModal(item)}>
              <UilEdit />
            </Link>
            <Popconfirm
              title={t('Common_AreYouSureDelete')}
              onConfirm={() => handleDelete(id)}
              okText={t('Common_Yes')}
              cancelText={t('Common_No')}
            >
              <Link className="invoice-delete" to="#">
                <UilTrash />
              </Link>
            </Popconfirm>
          </div>
        ),
      });
    });
  }

  const propsCustomHeader = {
    searchParams,
    setSearchParams,
    getList,
    state,
    setState,
    pagination,
    pageSize,
  };

  const dataTableColumn = useDataTable(propsCustomHeader);

  const handleSelectFilter = (key, value) => {
    const updatedParams = { ...searchParams, [key]: value };
    setSearchParams(updatedParams);
    getList({ ...updatedParams, shouldLoading: false, page_size: pageSize });
  };

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Mail_AccountList_Title')} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards>
                <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', alignItems: 'center', marginBottom: 20 }}>
                  <span className="label">{t('Common_SelectDepartment')}</span>
                  <Select
                    popupClassName="dropdown-select"
                    loading={loadingDepartments}
                    disabled={loadingDepartments}
                    onChange={(departmentId) => handleSelectFilter('departmentId', departmentId)}
                    style={{ width: 200, marginLeft: 10 }}
                    defaultValue=""
                  >
                    <Select.Option value="">{t('Common_All')}</Select.Option>
                    {departments?.length > 0 &&
                      departments.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                  </Select>

                  <span className="label" style={{ marginLeft: 30 }}>
                    {t('Chọn dự án')}
                  </span>
                  <Select
                    popupClassName="dropdown-select"
                    loading={loadingProjects}
                    disabled={loadingProjects || !departmentId}
                    onChange={(projectId) => handleSelectFilter('projectId', projectId)}
                    style={{ width: 200, marginLeft: 10 }}
                    defaultValue=""
                  >
                    <Select.Option value="">{t('Common_All')}</Select.Option>
                    {projects?.length > 0 &&
                      projects.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
                <Button onClick={showModal} type="primary" key="1">
                  <Link to="#">+ {t('Mail_AccountList_Create')}</Link>
                </Button>
                {isLoadingGetList ? (
                  <Skeleton active style={{ marginTop: 30 }} />
                ) : (
                  <DataTable
                    tableData={tableDataSource}
                    columns={dataTableColumn}
                    pagination={pagination}
                    setState={setState}
                    loading={searchLoading}
                  />
                )}
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>

      {state.visible && (
        <CreateAccount
          state={state}
          setState={setState}
          accounts={accounts}
          setAccounts={setAccounts}
          departments={departments}
        />
      )}

      {state.editVisible && (
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

export default EmailList;
