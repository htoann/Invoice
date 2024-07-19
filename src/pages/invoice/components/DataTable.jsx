import { Button } from '@/components/buttons/buttons';
import { DataService } from '@/config/dataService';
import { TableWrapper } from '@/container/styled';
import { downloadFile, formatTime } from '@/utils/index';
import { DownloadOutlined } from '@ant-design/icons';
import { UilSearch } from '@iconscout/react-unicons';
import { DatePicker, Select, Table } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableStyleWrap } from '../style';

function DataTable({ loading, tableData, columns, state, setState, getInvoiceList }) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { pagination, date_from, date_to, loaiHoaDon } = state;
  const { pageSize } = pagination;

  const getList = () => {
    getInvoiceList(1, pageSize, loaiHoaDon, date_from, date_to, true);
  };

  const handleLoaiHoaDonSearch = (loaiHoaDon) => {
    setState({
      ...state,
      pagination: { ...pagination, current: 1 },
      loaiHoaDon,
    });
    getList();
  };

  const handleSearch = () => {
    setState({
      ...state,
      pagination: { ...pagination, current: 1 },
    });
    getList();
  };

  const handleExport = async () => {
    try {
      const response = await DataService.get('invoices_excel/', {
        responseType: 'blob',
      });

      downloadFile(response, `HDDT${formatTime(startDate || endDate)}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  };

  const disabledStartDate = (current) => {
    return endDate && current ? current?._d?.getTime() > endDate.getTime() : false;
  };

  const disabledEndDate = (current) => {
    return startDate && current ? current?._d?.getTime() < startDate.getTime() : false;
  };

  return (
    <DataTableStyleWrap>
      <div className="invoice-datatable-filter">
        <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="invoice-datatable-filter__left">
            <div className="invoice-datatable-filter__input">
              <span className="label">{t('Invoice_InvoiceType')}</span>
              <Select
                popupClassName="dropdown-select"
                onChange={handleLoaiHoaDonSearch}
                style={{ width: 200 }}
                defaultValue="purchase"
              >
                <Select.Option value="purchase">{t('Invoice_Purchase')}</Select.Option>
                <Select.Option value="sold">{t('Invoice_Sold')}</Select.Option>
              </Select>
            </div>
            <div className="invoice-datatable-filter__input">
              <span className="label">{t('Invoice_StartDate')}</span>
              <DatePicker
                placeholder={t('Invoice_SelectStartDate')}
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    date_from: e?._d ? formatTime(e._d, 'DD-MM-YYYY') : null,
                  }));
                  setStartDate(e?._d || null);
                }}
                format="DD/MM/yyyy"
                disabledDate={disabledStartDate}
              />
            </div>
            <div className="invoice-datatable-filter__input">
              <span className="label">{t('Invoice_EndDate')}</span>
              <DatePicker
                placeholder={t('Invoice_SelectEndDate')}
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    date_to: e?._d ? formatTime(e._d, 'DD-MM-YYYY') : null,
                  }));
                  setEndDate(e?._d || null);
                }}
                format="DD/MM/yyyy"
                disabledDate={disabledEndDate}
              />
            </div>
            <div className="invoice-datatable-filter__action" style={{ marginRight: 10 }}>
              <Button type="primary" size="small" onClick={handleSearch} transparent icon={<UilSearch />}>
                {t('Invoice_Search')}
              </Button>
            </div>
          </div>

          <Button
            style={{ marginTop: 20 }}
            type="primary"
            size="small"
            outlined
            onClick={handleExport}
            disabled={!state.invoiceList?.length}
          >
            <DownloadOutlined />
            {t('Invoice_ExportExcel')}
          </Button>
        </div>
      </div>

      <div className="invoice-datatable">
        <TableWrapper className="table-data-view table-responsive">
          <Table
            pagination={{ pageSize: 20, showSizeChanger: true, ...pagination }}
            dataSource={tableData}
            columns={columns}
            onChange={(pagination) => {
              setState((prev) => ({
                ...prev,
                pagination,
              }));
            }}
            loading={loading}
          />
        </TableWrapper>
      </div>
    </DataTableStyleWrap>
  );
}

DataTable.propTypes = {
  tableData: PropTypes.array,
  columns: PropTypes.array,
};
export default DataTable;
