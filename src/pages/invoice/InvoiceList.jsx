import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';

import { DataService } from '../../config/dataService/dataService';
import { Main } from '../../container/styled';
import { tableReadData } from '../../redux/data-filter/actionCreator';
import DataTable from './components/data-table/DataTable';
import { invoiceListDataTable } from './const';
import { BorderLessHeading } from './style';
import { handleTableDataSource } from './utils';

function InvoiceList() {
  const dispatch = useDispatch();

  const pageRoutes = [
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

  const getInvoiceList = async (page, page_size = 20, loaihdon = 'purchase', date_from, date_to) => {
    try {
      const response = await DataService.get('invoices', {
        page,
        page_size,
        loaihdon,
        ...(date_from && { date_from }),
        ...(date_to && { date_to }),
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
    console.log(current);
    getInvoiceList(current, pageSize, loaiHoaDon);
    console.log('asd');
  }, [current, pageSize, loaiHoaDon]);

  const tableDataSource = handleTableDataSource(invoiceList);

  return (
    <>
      <PageHeader
        className="ninjadash-page-header-main"
        title={`Danh sách hóa đơn ${loaiHoaDon === 'purchase' ? 'mua vào' : 'bán ra'}`}
        routes={pageRoutes}
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
