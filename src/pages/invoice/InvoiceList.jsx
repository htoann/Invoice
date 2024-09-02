import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { BorderLessHeading, Main } from '@/container/styled';
import { API_INVOICES } from '@/utils/apiConst';
import { Col, Row } from 'antd';
import { useList } from 'hooks/useListCommon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from './components/DataTable';
import { useInvoiceDataTable } from './hooks/useDataTable';
import { handleTableDataSource, pageRoutes } from './utils';

function InvoiceList() {
  const { t } = useTranslation();

  const [state, setState] = useState({
    invoiceList: [],
    pagination: { current: 1, pageSize: 20 },
    loaiHoaDon: 'purchase',
    date_from: undefined,
    date_to: undefined,
  });

  const { loaiHoaDon, invoiceList, pagination } = state;
  const { current, pageSize } = pagination;

  const handleResponse = (response) => {
    setState((prev) => ({
      ...prev,
      invoiceList: response?.data?.results,
      pagination: {
        ...prev.pagination,
        total: Number(response?.data?.count) || 0,
      },
    }));
  };

  const { loading, getList: getInvoiceList } = useList(state, setState, API_INVOICES, 'khách hàng', handleResponse);

  const pageTitle = `${t('Invoice_List')} ${loaiHoaDon === 'purchase' ? t('Common_Purchase') : t('Common_Sold')}`;

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={pageTitle} routes={pageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards headless>
                <DataTable
                  tableData={handleTableDataSource(invoiceList, current, pageSize)}
                  columns={useInvoiceDataTable()}
                  state={state}
                  setState={setState}
                  getInvoiceList={getInvoiceList}
                  loading={loading}
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
