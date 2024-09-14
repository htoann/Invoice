import { Button } from '@/components/buttons';
import { Tab } from '@/components/tabs/tabs';
import { TableWrapper } from '@/container/styled';
import { API_INVOICES_EXCEL, dataService } from '@/service';
import { defaultPaginationConfig, downloadFile, formatTime } from '@/utils/index';
import { DownloadOutlined } from '@ant-design/icons';
import { DatePicker, notification, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableStyleWrap } from '../style';
import TaxNumberSelect from './TaxNumberSelect';

function DataTable({ loading, tableData, columns, state, setState, getInvoiceList }) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [taxNumber, setTaxNumber] = useState('');
  const [loadingExport, setLoadingExport] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { pagination, date_from, date_to, loaiHoaDon, invoiceList } = state;
  const { current, pageSize } = pagination;

  useEffect(() => {
    getInvoiceList({ loaihdon: loaiHoaDon, date_from, date_to, nbmst: taxNumber });
  }, [current, pageSize, loaiHoaDon, date_from, date_to, taxNumber]);

  const handleLoaiHoaDonSearch = (loaiHoaDon) => {
    setState({
      ...state,
      pagination: { ...pagination, current: 1 },
      loaiHoaDon,
    });
  };

  const handleExport = async () => {
    setLoadingExport(true);
    try {
      const response = await dataService.get(
        API_INVOICES_EXCEL,
        {
          loaihdon: loaiHoaDon,
          date_from,
          date_to,
          ids: selectedRowKeys,
        },
        {
          responseType: 'blob',
        },
      );

      downloadFile(response, `HDDT${formatTime(startDate || endDate)}.xlsx`);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể xuất excel hóa đơn. Vui lòng thử lại sau.',
      });
    } finally {
      setLoadingExport(false);
    }
  };

  const disabledStartDate = (current) => {
    return endDate && current ? current?._d?.getTime() > endDate.getTime() : false;
  };

  const disabledEndDate = (current) => {
    return startDate && current ? current?._d?.getTime() < startDate.getTime() : false;
  };

  const handleStartDateChange = (e) => {
    setState((prev) => ({
      ...prev,
      date_from: e?._d ? formatTime(e._d, 'DD-MM-YYYY') : null,
    }));
    setStartDate(e?._d || null);
  };

  const handleEndDateChange = (e) => {
    setState((prev) => ({
      ...prev,
      date_to: e?._d ? formatTime(e._d, 'DD-MM-YYYY') : null,
    }));
    setEndDate(e?._d || null);
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
            onChange={handleLoaiHoaDonSearch}
          />
        </Space>
        <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="invoice-datatable-filter__left">
            <div className="invoice-datatable-filter__input">
              <span className="label">{t('Invoice_StartDate')}</span>
              <DatePicker
                placeholder={t('Invoice_SelectStartDate')}
                onChange={handleStartDateChange}
                format="DD/MM/yyyy"
                disabledDate={disabledStartDate}
              />
            </div>

            <div className="invoice-datatable-filter__input">
              <span className="label">{t('Invoice_EndDate')}</span>
              <DatePicker
                placeholder={t('Invoice_SelectEndDate')}
                onChange={handleEndDateChange}
                format="DD/MM/yyyy"
                disabledDate={disabledEndDate}
              />
            </div>

            <div className="invoice-datatable-filter__input">
              <TaxNumberSelect taxNumber={taxNumber} onChange={(value) => setTaxNumber(value)} />
            </div>
          </div>

          <Button
            style={{ marginTop: 20 }}
            type="primary"
            size="small"
            outlined
            onClick={handleExport}
            disabled={!invoiceList?.length || loadingExport}
            loading={loadingExport}
          >
            <DownloadOutlined />
            {t('Common_ExportExcel')}
          </Button>
        </div>
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
