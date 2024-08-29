import { Button } from '@/components/buttons/buttons';
import { Tab } from '@/components/tabs/tabs';
import { TableWrapper } from '@/container/styled';
import { API_INVOICES_EXCEL } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { defaultPaginationConfig, downloadFile, formatTime } from '@/utils/index';
import { DownloadOutlined } from '@ant-design/icons';
import { DatePicker, notification, Select, Space, Table } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableStyleWrap } from '../style';

function DataTable({ loading, tableData, columns, state, setState, getInvoiceList }) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loadingExport, setLoadingExport] = useState(false);
  const [taxNumber, setTaxNumber] = useState();

  const { pagination, date_from, date_to, loaiHoaDon } = state;
  const { current, pageSize } = pagination;

  useEffect(() => {
    getInvoiceList(current, pageSize, loaiHoaDon, date_from, date_to, true);
  }, [current, pageSize, date_from, date_to, loaiHoaDon]);

  const handleLoaiHoaDonSearch = (loaiHoaDon) => {
    setState({
      ...state,
      pagination: { ...pagination, current: 1 },
      loaiHoaDon,
    });
  };

  // const handleSearch = () => {
  //   setState({
  //     ...state,
  //     pagination: { ...pagination, current: 1 },
  //   });
  // };

  const handleExport = async () => {
    setLoadingExport(true);

    try {
      const response = await dataService.get(
        API_INVOICES_EXCEL,
        {
          loaihdon: state.loaiHoaDon,
          ...(date_from && { date_from }),
          ...(date_to && { date_to }),
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

  const handleChangeTaxNumber = (value) => {
    setTaxNumber(value);
  };

  return (
    <DataTableStyleWrap>
      <div className="invoice-datatable-filter">
        <Space className="invoice-datatable-filter__input">
          {/* <span className="label">{t('Invoice_InvoiceType')}</span>
          <Select
            popupClassName="dropdown-select"
            onChange={handleLoaiHoaDonSearch}
            style={{ width: 200 }}
            defaultValue="purchase"
          >
            <Select.Option value="purchase">{t('Common_Purchase')}</Select.Option>
            <Select.Option value="sold">{t('Common_Sold')}</Select.Option>
          </Select> */}
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
              <span className="label">{t('Chọn mã số thuế')}</span>
              <Select
                onChange={handleChangeTaxNumber}
                style={{ width: 200 }}
                defaultValue={taxNumber ? taxNumber : 'all'}
              >
                <Select.Option value="all">{t('Common_All')}</Select.Option>
              </Select>
            </div>
            {/* <div className="invoice-datatable-filter__action" style={{ marginRight: 10 }}>
              <Button type="primary" size="small" onClick={handleSearch} transparent icon={<UilSearch />}>
                {t('Common_Search')}
              </Button>
            </div> */}
          </div>

          <Button
            style={{ marginTop: 20 }}
            type="primary"
            size="small"
            outlined
            onClick={handleExport}
            disabled={!state.invoiceList?.length || loadingExport}
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
