import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { DataService } from '@/config/dataService';
import { BorderLessHeading, Main } from '@/container/styled';
import { routes } from '@/routes/const';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from './components/DataTable';
import { useInvoiceDataTable } from './useDataTable';
import { handleTableDataSource } from './utils';

function InvoiceList() {
  const { t } = useTranslation();

  const pageRoutes = [
    {
      path: routes.invoice,
      breadcrumbName: t('Quản lý hóa đơn'),
    },
    {
      path: routes.invoice,
      breadcrumbName: t('Danh sách hóa đơn'),
    },
  ];

  const invoiceListDataTable = useInvoiceDataTable();

  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    invoiceList: [],
    pagination: { pageSize: 20, showSizeChanger: true, current: 1, total: 0 },
    loaiHoaDon: 'purchase',
    date_from: undefined,
    date_to: undefined,
  });

  const [isLoading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const { loaiHoaDon, invoiceList, pagination } = state;
  const { current, pageSize } = pagination;

  const getInvoiceList = async (page, page_size = 20, loaihdon = 'purchase', date_from, date_to, searchLoading) => {
    try {
      if (searchLoading) {
        setSearchLoading(true);
      } else {
        setLoading(true);
      }

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
    } finally {
      if (searchLoading) {
        setSearchLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getInvoiceList(current, pageSize);
  }, [current, pageSize]);

  const tableDataSource = handleTableDataSource(invoiceList, current, pageSize);

  return (
    <>
      <PageHeader
        className="ninjadash-page-header-main"
        title={`${t('Danh sách hóa đơn')} ${loaiHoaDon === 'purchase' ? t('mua vào') : t('bán ra')}`}
        routes={pageRoutes}
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards headless>
                <DataTable
                  tableData={tableDataSource}
                  columns={invoiceListDataTable}
                  state={state}
                  setState={setState}
                  getInvoiceList={getInvoiceList}
                  loading={isLoading || searchLoading}
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
