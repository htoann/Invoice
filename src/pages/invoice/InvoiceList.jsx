import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Col, Popconfirm, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';

import { BorderLessHeading, Main } from '../../container/styled';
import { tableReadData } from '../../redux/data-filter/actionCreator';
import EditAccount from './components/EditInvoice';
import DataTable from './components/data-table/DataTable';
import { invoiceListDataTable } from './const';

function InvoiceList() {
  const dispatch = useDispatch();

  const PageRoutes = [
    {
      path: '/invoices',
      breadcrumbName: 'Quản lý hóa đơn',
    },
    {
      path: '/invoices',
      breadcrumbName: 'Danh sách hóa đơn',
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
    invoiceList: [],
    pagination: { pageSize: 20, showSizeChanger: true, current: 1, total: 0 },
    loaiHoaDon: 'purchase',
    date_from: undefined,
    date_to: undefined,
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

  const getInvoiceList = async (page, pageSize = 20, _loaiHoaDon = 'purchase', _dateFrom, _dateTo) => {
    try {
      const response = await axios.get('http://localhost:8000/invoices', {
        params: {
          page,
          page_size: pageSize,
          loaihdon: _loaiHoaDon,
          ...(_dateFrom && { date_from: _dateFrom }),
          ...(_dateTo && { date_to: _dateTo }),
        },
      });

      if (response?.data) {
        setState((prev) => ({
          ...prev,
          invoiceList: response?.data?.results,
          pagination: {
            ...prev.pagination,
            total: Number(response?.data?.count) || 0,
          },
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { loaiHoaDon, invoiceList, pagination } = state;
  const { current, pageSize } = pagination;

  useEffect(() => {
    getInvoiceList(current, pageSize, loaiHoaDon);
  }, [current, pageSize, loaiHoaDon]);

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      update: data,
    });
  };

  const handleUserDelete = (id) => {
    const value = users.filter((item) => item.id !== id);
  };

  const tableDataSource = [];

  if (invoiceList.length > 0) {
    invoiceList.map((item) => {
      return tableDataSource.push({
        id: item.no,
        khmshdon: <span className="ninjadash-username">{item.khmshdon}</span>,
        khhdon: <span>{item.khhdon}</span>,
        shdon: <span>{item.shdon}</span>,
        ntao: <span>{item.ntao}</span>,
        nky: <span>{item.nky}</span>,
        nhomhd: <span>{item.nhomhd}</span>,
        chinhanh: <span>{item.chinhanh}</span>,
        nmmst: <span>{item.nmmst}</span>,
        nmten: <span>{item.nmten}</span>,
        tgtcthue: <span>{item.tgtcthue}</span>,
        tgtthue: <span>{item.tgtthue}</span>,
        ttcktmai: <span>{item.ttcktmai}</span>,
        thttlphi: <span>{item.thttlphi}</span>,
        tgtttbso: <span>{item.tgtttbso}</span>,
        dvtte: <span>{item.dvtte}</span>,
        tthai: <span>{item.tthai}</span>,
        ttxly: <span>{item.ttxly}</span>,
        linkhd: <span>{item.linkhd}</span>,
        matracuu: <span>{item.matracuu}</span>,
        sohdgoc: <span>{item.sohdgoc}</span>,
        sohdgocngay: <span>{item.sohdgocngay}</span>,
        loaitd: <span>{item.loaitd}</span>,
        ngaytd: <span>{item.ngaytd}</span>,
        msttd: <span>{item.msttd}</span>,
        tentd: <span>{item.tentd}</span>,
        diachitd: <span>{item.diachitd}</span>,
        ketquadoichieu: <span>{item.ketquadoichieu}</span>,
        tinhtrangdn: <span>{item.tinhtrangdn}</span>,
        ngaycongbo: <span>{item.ngaycongbo}</span>,
        action: (
          <div className="table-actions">
            <Link className="view" to={`/invoices/${item.no}`}>
              <UilEye />
            </Link>
            <Link className="edit" to="#" onClick={showEditModal}>
              <UilEdit />
            </Link>
            <Popconfirm
              title="Bạn có chắc chắn xóa người dùng này?"
              onConfirm={() => handleUserDelete(item.no)}
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

  return (
    <>
      <PageHeader
        className="ninjadash-page-header-main"
        title={`Danh sách hóa đơn ${loaiHoaDon === 'purchase' ? 'mua vào' : 'bán ra'}`}
        routes={PageRoutes}
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards>
                <DataTable
                  filterOption
                  tableData={tableDataSource}
                  columns={invoiceListDataTable}
                  pagination={pagination}
                  state={state}
                  setState={setState}
                  getInvoiceList={getInvoiceList}
                />
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>

      {state.editVisible && <EditAccount state={state} setState={setState} />}
    </>
  );
}

export default InvoiceList;
