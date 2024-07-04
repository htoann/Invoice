import { Col, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';

import { Main } from '../../container/styled';
import { tableReadData } from '../../redux/data-filter/actionCreator';
import DataTable from './components/data-table/DataTable';
import { invoiceListDataTable } from './const';
import { BorderLessHeading } from './style';

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
    invoiceList: [],
    pagination: { pageSize: 20, showSizeChanger: true, current: 1, total: 0 },
    loaiHoaDon: 'purchase',
    date_from: undefined,
    date_to: undefined,
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
    </>
  );
}

export default InvoiceList;
