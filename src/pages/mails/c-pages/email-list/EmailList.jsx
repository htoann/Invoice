import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Button, Col, Input, Popconfirm, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../../components/page-headers/page-headers';

import { BorderLessHeading, Main } from '../../../../container/styled';
import CreateAccount from '../../components/CreateAccount';
import EditAccount from '../../components/EditAccount';
import DataTable from './DataTable';
import axios from './mockApi';

export const EmailList = () => {
  const pageRoutes = [
    {
      path: '/email/inbox',
      breadcrumbName: 'Hộp thư',
    },
    {
      path: '/email',
      breadcrumbName: 'Danh sách email',
    },
  ];

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

  const [accounts, setAccounts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getList = async () => {
    try {
      const response = await axios.get('/api/accounts');
      setAccounts(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Failed to fetch accounts', error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

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
      await axios.delete(`/api/accounts/${id}`);
      setAccounts(accounts.filter((account) => account.id !== id));
    } catch (error) {
      console.error('Failed to delete account', error);
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSearch = (e, dataIndex) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setFilteredData(accounts.filter((item) => item[dataIndex].toString().toLowerCase().includes(value)));
  };

  const tableDataScource = [];

  tableDataScource.push({
    key: 'searchInput',
    id: '',
    username: (
      <Input
        style={{ width: 'auto', height: 35 }}
        onClick={stopPropagation}
        onFocus={stopPropagation}
        onKeyDown={stopPropagation}
        value={searchText.name}
        onChange={(e) => {
          e.stopPropagation();
          handleSearch(e, 'username');
        }}
      />
    ),
    email: (
      <Input
        style={{ width: 'auto', height: 35 }}
        onClick={stopPropagation}
        onFocus={stopPropagation}
        onKeyDown={stopPropagation}
        value={searchText.name}
        onChange={(e) => {
          e.stopPropagation();
          handleSearch(e, 'email');
        }}
      />
    ),
    disableSort: true,
  });

  if (filteredData?.length > 0) {
    filteredData.map((item) => {
      const { id, username, email } = item;
      return tableDataScource.push({
        id,
        username: <span className="ninjadash-username">{username}</span>,
        email: <span>{email}</span>,
        action: (
          <div className="table-actions">
            <Link className="edit" to="#" onClick={showEditModal}>
              <UilEdit />
            </Link>
            <Popconfirm
              title="Bạn có chắc chắn xóa người dùng này?"
              onConfirm={() => handleDelete(id)}
              okText="Có"
              cancelText="Không"
            >
              <Link className="ninjadash-delete" to="#">
                <UilTrash />
              </Link>
            </Popconfirm>
          </div>
        ),
      });
    });
  }

  const dataTableColumn = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => {
        if (b?.disableSort) return null;
        return a.username.props.children.localeCompare(b.username.props.children);
      },
    },
    {
      title: 'Địa chỉ email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => {
        if (b?.disableSort) return null;
        return a.email.props.children.localeCompare(b.email.props.children);
      },
    },
    {
      title: 'Chức năng',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Danh sách email" routes={pageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards>
                <Button onClick={showModal} className="btn-add_new" size="default" type="primary" key="1">
                  <Link to="#">+ Thêm email</Link>
                </Button>
                <DataTable
                  tableData={tableDataScource}
                  columns={dataTableColumn}
                  pagination={pagination}
                  state={state}
                  setState={setState}
                  getList={getList}
                />
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>

      {state.visible && <CreateAccount state={state} setState={setState} />}

      {state.editVisible && <EditAccount state={state} setState={setState} />}
    </>
  );
};
