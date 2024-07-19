import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { BorderLessHeading, Main } from '@/container/styled';
import axios from '@/mock/index';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Col, Input, Popconfirm, Row, Skeleton, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateProduct from './components/CreateProduct';
import DataTable from './components/DataTable';
import EditProduct from './components/EditProduct';

export const Product = () => {
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

  const [list, setList] = useState([]);
  const [isLoadingGetList, setIsLoadingGetList] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    mahang: '',
    tenHangBan: '',
    tenHangMua: '',
    donViTinh: '',
    taiKhoanHang: '',
    taiKhoanGiaVon: '',
    taiKhoanDoanhThu: '',
  });

  const getList = async ({
    mahang = '',
    tenHangBan = '',
    tenHangMua = '',
    donViTinh = '',
    taiKhoanHang = '',
    taiKhoanGiaVon = '',
    taiKhoanDoanhThu = '',
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

      const response = await axios.get('/products', {
        mahang,
        tenHangBan,
        tenHangMua,
        donViTinh,
        taiKhoanHang,
        taiKhoanGiaVon,
        taiKhoanDoanhThu,
        page,
        page_size,
      });

      if (response?.data) {
        setList(response?.data?.results);
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

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      update: data,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      setList(list.filter((account) => account.id !== id));

      notification.success({
        message: 'Xóa thành công',
        description: 'Hàng hoá đã được xóa thành công.',
      });
    } catch (error) {
      notification.error({
        message: 'Xóa thất bại',
        description: 'Không thể xóa hàng hoá. Vui lòng thử lại sau.',
      });
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const tableDataScource = [];

  if (list?.length > 0) {
    list.map((item, index) => {
      const { id, mahang, tenHangBan, tenHangMua, donViTinh, taiKhoanHang, taiKhoanGiaVon, taiKhoanDoanhThu } = item;

      return tableDataScource.push({
        key: id,
        stt: (current - 1) * pageSize + index + 1,
        id,
        mahang: <span>{mahang}</span>,
        tenHangBan: <span>{tenHangBan}</span>,
        tenHangMua: <span>{tenHangMua}</span>,
        donViTinh: <span>{donViTinh}</span>,
        taiKhoanHang: <span>{taiKhoanHang}</span>,
        taiKhoanGiaVon: <span>{taiKhoanGiaVon}</span>,
        taiKhoanDoanhThu: <span>{taiKhoanDoanhThu}</span>,
        action: (
          <div className="table-actions">
            <Link className="edit" to="#" onClick={() => showEditModal(item)}>
              <UilEdit />
            </Link>
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá?"
              onConfirm={() => handleDelete(id)}
              okText="Có"
              cancelText="Không"
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
      <div>{title}</div>
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
      col.key !== 'stt' && col.key !== 'action'
        ? (a, b) => a[col.dataIndex].props.children.localeCompare(b[col.dataIndex].props.children)
        : false,
    fixed: col.fixed,
    className: col.key === 'stt' || col.key === 'action' ? '' : 'searchInput',
  }));

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    getCheckboxProps: (record) => ({
      id: record.id,
    }),
  };

  return (
    <>
      <PageHeader className="invoice-page-header-main" title="Danh sách hàng hóa" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards headless>
                {isLoadingGetList ? (
                  <Skeleton active style={{ marginTop: 30 }} />
                ) : (
                  <DataTable
                    tableData={tableDataScource}
                    columns={dataTableColumn}
                    rowSelection={rowSelection}
                    state={state}
                    setState={setState}
                    loading={searchLoading}
                  />
                )}
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>

      {state.visible && <CreateProduct state={state} setState={setState} list={list} setList={setList} />}

      {state.editVisible && <EditProduct state={state} setState={setState} list={list} setList={setList} />}
    </>
  );
};
