import { Col, Input, Popconfirm, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../../components/page-headers/page-headers';

import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { BorderLessHeading, Main } from '../../../../container/styled';
import { contactDeleteData } from '../../../../redux/contact/actionCreator';
import { tableReadData } from '../../../../redux/data-filter/actionCreator';
import CreateHangHoa from './components/CreateHangHoa';
import DataTable from './components/data-table/DataTable';
import EditHangHoa from './components/EditHangHoa';

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

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(users || []);

  useEffect(() => {
    if (dispatch) {
      dispatch(tableReadData());
    }
  }, [dispatch]);

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      update: data,
    });
  };

  const handleDelete = (id) => {
    const value = users.filter((item) => item.id !== id);
    dispatch(contactDeleteData(value));
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSearch = (e, dataIndex) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setFilteredData(users.filter((item) => item[dataIndex].toString().toLowerCase().includes(value)));
  };

  const tableDataScource = [];

  tableDataScource.push({
    key: 'searchInput',
    id: '',
    user: (
      <Input
        style={{ width: 'auto' }}
        onClick={stopPropagation}
        onFocus={stopPropagation}
        onKeyDown={stopPropagation}
        value={searchText.name}
        onChange={(e) => {
          e.stopPropagation();
          handleSearch(e, 'name');
        }}
      />
    ),
    email: (
      <Input
        style={{ width: 'auto' }}
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
    filteredData.map((item, index) => {
      const { id, name, email } = item;

      return tableDataScource.push({
        key: id,
        id: index + 1,
        user: <span className="ninjadash-username">{name}</span>,
        email: <span>{email}</span>,
        action: (
          <div className="table-actions">
            <Link className="edit" to="#" onClick={() => showEditModal(item)}>
              <UilEdit />
            </Link>
            <Popconfirm
              title="Bạn có chắc chắn xóa người dùng này?"
              onConfirm={() => handleDelete(id)}
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
      title: 'Mã hàng',
      dataIndex: 'user',
      key: 'name',
      sorter: (a, b) => {
        if (b?.disableSort) return null;
        return a.user.props.children.localeCompare(b.user.props.children);
      },
    },
    {
      title: 'Tên hàng bán ra',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => {
        if (b?.key === 'searchInput') return null;
        return a.user.props.children.localeCompare(b.user.props.children);
      },
    },
    {
      title: 'Tên hàng mua vào',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => {
        if (b?.key === 'searchInput') return null;
        return a.user.props.children.localeCompare(b.user.props.children);
      },
    },
    {
      title: 'Đơn vị tính',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => {
        if (b?.key === 'searchInput') return null;
        return a.user.props.children.localeCompare(b.user.props.children);
      },
    },
    {
      title: 'Tài khoản hàng hóa',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => {
        if (b?.key === 'searchInput') return null;
        return a.user.props.children.localeCompare(b.user.props.children);
      },
    },
    {
      title: 'Tài khoản giá vốn',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => {
        if (b?.key === 'searchInput') return null;
        return a.user.props.children.localeCompare(b.user.props.children);
      },
    },
    {
      title: 'Tài khoản doanh thu',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => {
        if (b?.key === 'searchInput') return null;
        return a.user.props.children.localeCompare(b.user.props.children);
      },
    },
    {
      title: 'Chức năng',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    getCheckboxProps: (record) => ({
      disabled: record.key === 'searchInput',
      name: record.name,
    }),
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Danh sách hàng hóa" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards headless>
                <DataTable
                  filterOption
                  tableData={tableDataScource}
                  columns={dataTableColumn}
                  rowSelection={rowSelection}
                  state={state}
                  setState={setState}
                />
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>

      {state.visible && <CreateHangHoa state={state} setState={setState} />}

      {state.editVisible && <EditHangHoa state={state} setState={setState} />}
    </>
  );
};
