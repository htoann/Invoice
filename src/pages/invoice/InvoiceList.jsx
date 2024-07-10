import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';

import { DataService } from '../../config/dataService/dataService';
import { BorderLessHeading, Main } from '../../container/styled';
import DataTable from './components/DataTable';
import { invoiceListDataTable } from './const';
import { handleTableDataSource } from './utils';

function InvoiceList() {
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
    getInvoiceList(current, pageSize, loaiHoaDon);
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
              <Cards headless>
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
