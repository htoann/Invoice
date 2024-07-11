import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { BorderLessHeading, Main } from '@/container/styled';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Button, Col, Input, notification, Popconfirm, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../mockApi';
import DataTable from './DataTable';
import CreateAccount from './components/CreateAccount';
import UpdateAccount from './components/UpdateAccount';

export const EmailList = () => {
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

  const [initAccounts, setInitAccounts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isLoadingGetList, setIsLoadingGetList] = useState(false);
  const [searchText, setSearchText] = useState('');

  const getList = async () => {
    try {
      setIsLoadingGetList(true);
      const response = await axios.get('/api/accounts');

      setAccounts(response.data);
      setInitAccounts(response.data);
    } catch (error) {
      console.error('Failed to fetch accounts', error);
    } finally {
      setIsLoadingGetList(false);
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

      notification.success({
        message: 'Xóa thành công',
        description: 'Tài khoản đã được xóa thành công.',
      });
    } catch (error) {
      notification.error({
        message: 'Xóa thất bại',
        description: 'Không thể xóa tài khoản. Vui lòng thử lại sau.',
      });
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSearch = (e, dataIndex) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setAccounts(initAccounts.filter((item) => item[dataIndex].toString().toLowerCase().includes(value)));
  };

  const tableDataScource = [];

  if (accounts?.length > 0) {
    accounts.map((item, index) => {
      const { id, username, email } = item;
      return tableDataScource.push({
        key: id,
        stt: index + 1,
        id,
        username: <span className="ninjadash-username">{username}</span>,
        email: <span>{email}</span>,
        action: (
          <div className="table-actions">
            <Link className="edit" to="#" onClick={() => showEditModal(item)}>
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

  const customHeader = (title, name) => (
    <>
      <div>{title}</div>
      <Input
        style={{ width: 'auto', height: 35, marginTop: 10 }}
        onClick={stopPropagation}
        onFocus={stopPropagation}
        onKeyDown={stopPropagation}
        value={searchText.name}
        onChange={(e) => {
          e.stopPropagation();
          handleSearch(e, name);
        }}
      />
    </>
  );

  const dataTableColumn = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: <>{customHeader('Tên tài khoản', 'username')}</>,
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.props.children.localeCompare(b.username.props.children),
    },
    {
      title: <>{customHeader('Địa chỉ email', 'username')}</>,
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.props.children.localeCompare(b.email.props.children),
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
      <PageHeader className="ninjadash-page-header-main" title="Danh sách email" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards>
                <Button onClick={showModal} className="btn-add_new" size="default" type="primary" key="1">
                  <Link to="#">+ Thêm email</Link>
                </Button>
                {isLoadingGetList ? (
                  <Skeleton active style={{ marginTop: 30 }} />
                ) : (
                  <DataTable
                    tableData={tableDataScource}
                    columns={dataTableColumn}
                    pagination={pagination}
                    state={state}
                    setState={setState}
                    getList={getList}
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
