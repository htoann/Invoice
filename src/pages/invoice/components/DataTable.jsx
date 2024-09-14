import { Tab } from '@/components/tabs/tabs';
import { TableWrapper } from '@/container/styled';
import { defaultPaginationConfig } from '@/utils/index';
import { Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableStyleWrap } from '../style';
import { isPurchase } from '../utils';
import { HeaderTable } from './HeaderTable';

function DataTable({ loading, tableData, columns, state, setState, getInvoiceList }) {
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [searchParams, setSearchParams] = useState({
    taxNumber: '',
    khmshdon: ' ',
    khhdon: '',
    shdon: '',
    date_from: undefined,
    date_to: undefined,
  });

  const { pagination, invoiceType } = state;
  const { current, pageSize } = pagination;
  const { taxNumber, date_from, date_to } = searchParams;

  useEffect(() => {
    const mst = isPurchase(invoiceType) ? { nbmst: taxNumber } : { nmmst: taxNumber };
    getInvoiceList({ loaihdon: invoiceType, date_from, date_to, ...mst, ...searchParams });
  }, [current, pageSize, invoiceType, date_from, date_to, searchParams]);

  const handleChangeInvoiceType = (invoiceType) => {
    setState({
      ...state,
      pagination: { ...pagination, current: 1 },
      invoiceType,
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => {
      return {
        id: record.id,
      };
    },
  };

  return (
    <DataTableStyleWrap>
      <div className="invoice-datatable-filter">
        <Space className="invoice-datatable-filter__input">
          <Tab
            data={[
              { key: 'purchase', tabTitle: t('Common_Purchase'), disabled: loading },
              { key: 'sold', tabTitle: t('Common_Sold'), disabled: loading },
            ]}
            onChange={handleChangeInvoiceType}
          />
        </Space>
        <HeaderTable
          state={state}
          selectedRowKeys={selectedRowKeys}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      <div className="invoice-datatable">
        <TableWrapper className="table-data-view table-responsive">
          <Table
            pagination={{ ...defaultPaginationConfig, ...pagination }}
            dataSource={tableData}
            columns={columns}
            loading={loading}
            rowSelection={rowSelection}
            onChange={(pagination) => {
              setState((prev) => ({
                ...prev,
                pagination,
              }));
            }}
          />
        </TableWrapper>
      </div>
    </DataTableStyleWrap>
  );
}

export default DataTable;
