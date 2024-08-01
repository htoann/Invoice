/* eslint-disable no-unused-vars */
import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { DataService } from '@/utils/dataService';
import { BorderLessHeading, Main } from '@/container/styled';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Col, Input, notification, Popconfirm, Row, Select, Skeleton } from 'antd';
import useDepartments from 'hooks/useDepartments';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import DataTable from './components/DataTable';
import UpdateAccount from './components/UpdateAccount';

const EmailList = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    url: null,
    update: {},
    pagination: { pageSize: 20, showSizeChanger: true, current: 1, total: 0 },
  });

  const { pagination } = state;
  const { current, pageSize } = pagination;

  const [accounts, setAccounts] = useState([]);
  const [isLoadingGetList, setIsLoadingGetList] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ name: '', password: '', departmentId: '' });

  const { loadingDepartments, departments } = useDepartments();

  const getList = async ({
    name = '',
    email = '',
    departmentId = '',
    page = 1,
    page_size = 20,
    searchLoading = true,
  } = {}) => {
    try {
      if (searchLoading) {
        setSearchLoading(true);
      } else {
        setIsLoadingGetList(true);
      }

      const response = await DataService.get('/mails/accounts/', {
        name,
        email,
        page,
        page_size,
        // department_id: departmentId,
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
    } finally {
      if (searchLoading) {
        setSearchLoading(false);
      } else {
        setIsLoadingGetList(false);
      }
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
      await DataService.delete(`/mails/accounts/${id}`);
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

  const stopPropagation = (e) => {
    e.stopPropagation();
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
        department: <span>{department?.name}</span>,
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

  const customHeader = (title, name) => (
    <>
      <div>{t(title)}</div>
      <Input
        style={{ width: 'auto', height: 35, marginTop: 10 }}
        onClick={stopPropagation}
        onFocus={stopPropagation}
        value={searchParams[name]}
        onChange={(e) => {
          e.stopPropagation();
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

  const dataTableColumn = [
    {
      title: t('STT'),
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: <>{customHeader(t('Common_AccountName'), 'name')}</>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.props.children.localeCompare(b.name.props.children),
      className: 'searchInput',
    },
    {
      title: <>{customHeader(t('Common_Email'), 'email')}</>,
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.props.children.localeCompare(b.email.props.children),
      className: 'searchInput',
    },
    {
      title: <>{t('Common_Department')}</>,
      dataIndex: 'department',
      key: 'department',
      sorter: (a, b) => a.department.props.children.localeCompare(b.department.props.children),
    },
    {
      title: t('Common_Action'),
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  const handleSelectDepartment = (departmentId) => {
    setSearchParams({ ...searchParams, departmentId });
    getList({ ...searchParams, shouldLoading: false, page_size: pageSize, departmentId });
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
                    onChange={handleSelectDepartment}
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
        <CreateAccount state={state} setState={setState} accounts={accounts} setAccounts={setAccounts} />
      )}

      {state.editVisible && (
        <UpdateAccount state={state} setState={setState} accounts={accounts} setAccounts={setAccounts} />
      )}
    </>
  );
};

export default EmailList;
