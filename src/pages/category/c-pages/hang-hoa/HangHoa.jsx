import { UilFileExport } from '@iconscout/react-unicons';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Button, Col, Popconfirm, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import DataTable from '../../../../components/data-table/DataTable';
import { PageHeader } from '../../../../components/page-headers/page-headers';

import { DataService } from '../../../../config/dataService/dataService';
import { Main } from '../../../../container/styled';
import { contactDeleteData } from '../../../../redux/contact/actionCreator';
import { tableReadData } from '../../../../redux/data-filter/actionCreator';
import { downloadFile, formatTime } from '../../../../utility/utility';
import { BorderLessHeading } from '../../style';
import CreateAccount from './components/CreateAccount';
import EditAccount from './components/EditAccount';

export const HangHoa = () => {
  const dispatch = useDispatch();

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

  if (users.length > 0) {
    users.map((item, index) => {
      const { id, name, email } = item;
      return tableDataScource.push({
        key: id,
        id: index + 1,
        user: <span className="ninjadash-username">{name}</span>,
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
      key: 'name',
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleExport = async () => {
    try {
      const response = await DataService.get('invoices_excel/', {
        responseType: 'blob',
      });

      downloadFile(response, `HangHoa${formatTime(state.date_from || state.date_to)}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Danh sách hàng hóa" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
                  <Button onClick={showModal} className="btn-add_new" size="default" type="primary" key="1">
                    <Link to="#">+ Thêm mã hàng</Link>
                  </Button>
                  <Button
                    className="btn-add_new"
                    type="primary"
                    size="default"
                    onClick={handleExport}
                    disabled={!state.invoiceList?.length}
                    transparented
                  >
                    <div style={{ display: 'flex' }}>
                      <UilFileExport style={{ marginRight: 8, height: 20 }} />
                      <div>Xuất Excel</div>
                    </div>
                  </Button>
                </div>
                <DataTable
                  filterOption
                  filterOnchange
                  tableData={tableDataScource}
                  columns={dataTableColumn}
                  rowSelection={rowSelection}
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
