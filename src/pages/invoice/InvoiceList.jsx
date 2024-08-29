import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { BorderLessHeading, Main } from '@/container/styled';
import { routes } from '@/routes/const';
import { API_INVOICES } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { Col, notification, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from './components/DataTable';
import { useInvoiceDataTable } from './hooks/useDataTable';
import { handleTableDataSource } from './utils';

function InvoiceList() {
  const { t } = useTranslation();
  const invoiceListDataTable = useInvoiceDataTable();

  const pageRoutes = [
    { path: routes.invoice, breadcrumbName: t('Invoice_Management') },
    { path: routes.invoice, breadcrumbName: t('Invoice_List') },
  ];

  const [state, setState] = useState({
    invoiceList: [],
    pagination: { current: 1, total: 0 },
    loaiHoaDon: 'purchase',
    date_from: undefined,
    date_to: undefined,
  });

  const [isLoading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const { loaiHoaDon, invoiceList, pagination } = state;
  const { current, pageSize } = pagination;

  const tableDataSource = handleTableDataSource(invoiceList, current, pageSize);

  const getInvoiceList = async (page, page_size = 20, loaihdon = 'purchase', date_from, date_to, searchLoading) => {
    try {
      searchLoading ? setSearchLoading(true) : setLoading(true);

      const response = await dataService.get(API_INVOICES, {
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
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách hóa đơn. Vui lòng thử lại sau.',
      });
    } finally {
      searchLoading ? setSearchLoading(false) : setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        className="invoice-page-header-main"
        title={`${t('Invoice_List')} ${loaiHoaDon === 'purchase' ? t('Common_Purchase') : t('Common_Sold')}`}
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
