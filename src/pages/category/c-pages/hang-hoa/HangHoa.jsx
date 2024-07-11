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
import EditHangHoa from './components/EditHangHoa';
import DataTable from './components/DataTable';

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

  if (filteredData?.length > 0) {
    filteredData.map((item, index) => {
      const { id, name, email } = item;

      return tableDataScource.push({
        key: id,
        stt: index + 1,
        id,
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

  const columnData = [
    { title: 'STT', dataIndex: 'stt', key: 'stt' },
    { title: 'Mã hàng', dataIndex: 'mahang', key: 'mahang' },
    { title: 'Tên hàng bán ra', dataIndex: 'tenHangBan', key: 'tenHangBan' },
    { title: 'Tên hàng mua vào', dataIndex: 'tenHangMua', key: 'tenHangMua' },
    { title: 'Đơn vị tính', dataIndex: 'donViTinh', key: 'donViTinh' },
    { title: 'Tài khoản hàng hóa', dataIndex: 'taiKhoanHang', key: 'taiKhoanHang' },
    { title: 'Tài khoản giá vốn', dataIndex: 'taiKhoanGiaVon', key: 'taiKhoanGiaVon' },
    { title: 'Tài khoản doanh thu', dataIndex: 'taiKhoanDoanhThu', key: 'taiKhoanDoanhThu' },
    { title: 'Chức năng', dataIndex: 'action', key: 'action', fixed: 'right' },
  ];

  const dataTableColumn = columnData.map((col) => ({
    title: col.key === 'stt' || col.key === 'action' ? col.title : <>{customHeader(col.title, col.dataIndex)}</>,
    dataIndex: col.dataIndex,
    key: col.key,
    sorter:
      col.key !== 'stt' && col.key !== 'action' ? (a, b) => a[col.dataIndex].localeCompare(b[col.dataIndex]) : false,
  }));

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
