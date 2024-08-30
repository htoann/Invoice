/* eslint-disable no-unused-vars */
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Button, Col, notification, Popconfirm, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { BorderLessHeading, Main } from '@/container/styled';
import useProjects from '@/pages/category/c-pages/organization/hook/useProjects';
import { API_MAILS_ACCOUNT_BY_ACCOUNT_ID, API_MAILS_ACCOUNTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import useGetAllDepartments from 'hooks/useGetAllDepartments';
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
    pagination: { current: 1, pageSize: 20, total: 0 },
  });

  const { pagination, visible, editVisible } = state;
  const { current, pageSize } = pagination;

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ name: '', email: '', departmentId: '' });

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

  const tableDataSource =
    accounts?.length > 0
      ? accounts.map((item, index) => ({
          key: item?.id,
          stt: (current - 1) * pageSize + index + 1,
          id: item?.id,
          name: <span>{item?.name}</span>,
          email: <span>{item?.email}</span>,
          department: <span>{departments?.find((dept) => dept?.id === item?.department)?.name}</span>,
          action: (
            <div className="table-actions">
              <Link className="edit" to="#" onClick={() => showEditModal(item)}>
                <UilEdit />
              </Link>
              <Popconfirm
                title={t('Common_AreYouSureDelete')}
                onConfirm={() => handleDelete(item?.id)}
                okText={t('Common_Yes')}
                cancelText={t('Common_No')}
              >
                <Link className="invoice-delete" to="#">
                  <UilTrash />
                </Link>
              </Popconfirm>
            </div>
          ),
        }))
      : [];

  const dataTableColumn = useDataTable(searchParams, setSearchParams, getList, state, setState, pagination, pageSize);

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
                <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', alignItems: 'center', marginBottom: 20 }}>
                  <span className="label">{t('Common_SelectDepartment')}</span>
                  <Select
                    popupClassName="dropdown-select"
                    loading={loadingDepartments}
                    disabled={loadingDepartments}
                    onChange={(departmentId) => handleFilterChange('departmentId', departmentId)}
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
                    onChange={(projectId) => handleFilterChange('projectId', projectId)}
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

export default EmailList;
