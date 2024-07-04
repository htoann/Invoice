import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Button, Col, Popconfirm, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cards } from '../../components/cards/frame/cards-frame';
import DataTable from '../../components/data-table/DataTable';
import { PageHeader } from '../../components/page-headers/page-headers';

import { Main } from '../../container/styled';
import { contactDeleteData } from '../../redux/contact/actionCreator';
import { tableReadData } from '../../redux/data-filter/actionCreator';
import CreateAccount from './components/CreateAccount';
import EditAccount from './components/EditAccount';
import { BorderLessHeading } from './style';

function AccountList() {
  const dispatch = useDispatch();

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Hộp thư',
    },
    {
      path: 'first',
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
  });

  const { users } = useSelector((stateItem) => {
    return {
      users: stateItem.Contact.data,
    };
  });

  useEffect(() => {
    if (dispatch) {
      dispatch(tableReadData());
    }
  }, [dispatch]);

  const { TableData } = useSelector((states) => {
    return {
      TableData: states.dataTable.tableData,
    };
  });

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

  const handleUserDelete = (id) => {
    const value = users.filter((item) => item.id !== id);
    dispatch(contactDeleteData(value));
  };

  const tableDataScource = [];

  if (TableData.length > 0) {
    TableData.map((item) => {
      const { id, username, email } = item;
      return tableDataScource.push({
        id,
        user: <span className="ninjadash-username">{username}</span>,
        email: <span>{email}</span>,
        action: (
          <div className="table-actions">
            <Link className="edit" to="#" onClick={showEditModal}>
              <UilEdit />
            </Link>
            <Popconfirm
              title="Bạn có chắc chắn xóa người dùng này?"
              onConfirm={() => handleUserDelete(id)}
              okText="Yes"
              cancelText="No"
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
      dataIndex: 'user',
      key: 'user',
      sorter: (a, b) => a.user.props.children.localeCompare(b.user.props.children),
    },
    {
      title: 'Địa chỉ email',
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
      <PageHeader className="ninjadash-page-header-main" title="Danh sách email" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards>
                <Button onClick={showModal} className="btn-add_new" size="default" type="primary" key="1">
                  <Link to="#">+ Thêm email</Link>
                </Button>
                <DataTable
                  filterOption
                  filterOnchange
                  tableData={tableDataScource}
                  columns={dataTableColumn}
                  rowSelection={false}
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
}

export default AccountList;
