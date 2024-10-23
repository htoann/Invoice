import { PageHeader } from '@/components/page-header';
import { LayoutContent } from '@/layout/LayoutContent';
import { API_INVOICES } from '@/service';
import { useList } from 'hooks/useListCommon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from './components/DataTable';
import { handleDataTable, handleTableDataSource, isPurchase, pageRoutes } from './utils';

function InvoiceList() {
  const { t } = useTranslation();

  const [state, setState] = useState({
    invoiceList: [],
    pagination: { current: 1, pageSize: 20 },
    invoiceType: 'purchase',
  });

  const { invoiceType, invoiceList, pagination } = state;
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

  const pageTitle = `${t('Invoice_List')} ${isPurchase(invoiceType) ? t('Common_Purchase') : t('Common_Sold')}`;

  return (
    <>
      <PageHeader title={pageTitle} routes={pageRoutes} />
      <LayoutContent borderLessHeading cards cardsProps={{ headless: true }}>
        <DataTable
          tableData={handleTableDataSource(invoiceList, current, pageSize)}
          columns={handleDataTable(invoiceType)}
          state={state}
          setState={setState}
          getInvoiceList={getInvoiceList}
          loading={loading}
        />
      </LayoutContent>
    </>
  );
}

export default InvoiceList;
