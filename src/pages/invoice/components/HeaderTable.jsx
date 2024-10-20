import { Button } from '@/components/buttons';
import { API_INVOICES_EXCEL, API_INVOICES_ZIP } from '@/service/apiConst';
import { dataService } from '@/service/dataService';
import dayjs from '@/utils/dayjs';
import { DATE_FORMAT_DASH, DATE_FORMAT_SLASH, debounce, downloadFile, formatTime } from '@/utils/index';
import { DownloadOutlined } from '@ant-design/icons';
import { DatePicker, Dropdown, Input, notification } from 'antd';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isPurchase } from '../utils';

export const HeaderTable = ({ state, setState, selectedRowKeys, searchParams, setSearchParams }) => {
  const { t } = useTranslation();

  const { invoiceType, invoiceList } = state;
  const { taxNumber, ten, khhdon, shdon, date_from, date_to } = searchParams;

  const [loadingExport, setLoadingExport] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const fromDate = dayjs(date_from, DATE_FORMAT_DASH).toDate();
  const toDate = dayjs(date_to, DATE_FORMAT_DASH).toDate();

  const handleExport = async () => {
    setLoadingExport(true);
    try {
      const response = await dataService.get(
        API_INVOICES_EXCEL,
        { loaihdon: invoiceType, ...searchParams },
        { responseType: 'blob' },
      );
      downloadFile(response, `HDDT_${formatTime(new Date(), 'YYYYMMDDHHmm')}.xlsx`);
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

  const handleDownload = async (type) => {
    setLoadingDownload(true);
    try {
      const response = await dataService.get(
        API_INVOICES_ZIP,
        {
          loaihdon: invoiceType,
          type,
          mst: taxNumber,
          ...(selectedRowKeys?.length && { ids: JSON.stringify(selectedRowKeys) }),
          ...searchParams,
        },
        { responseType: 'blob' },
      );
      downloadFile(response, `HDDT_${formatTime(new Date(), 'YYYYMMDDHHmm')}.zip`);
    } catch (error) {
      const errorMsg =
        error?.response?.status === '404' ? t('Không tìm thấy file để tải về.') : t('Có lỗi xảy ra khi tải file');

      notification.error({
        message: 'Lỗi',
        description: errorMsg,
      });
    } finally {
      setLoadingDownload(false);
    }
  };

  const resetPagination = () => {
    setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
    }));
  };

  const handleDateChange = (key, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value ? formatTime(value, DATE_FORMAT_DASH) : null,
    }));
    resetPagination();
  };

  const handleFilterChange = (key, value) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
    resetPagination();
  };

  const debouncedFilterChange = useCallback(
    debounce((key, value) => handleFilterChange(key, value), 300),
    [],
  );

  const downloadMenu = {
    items: [
      { label: 'PDF', key: 'pdf' },
      { label: 'XML', key: 'xml' },
    ],
    onClick: ({ key }) => handleDownload(key),
  };

  const inputStyle = { minWidth: '200px' };

  const invoiceDateInputs = [
    {
      label: t('Invoice_StartDate'),
      placeholder: t('Invoice_SelectStartDate'),
      value: date_from,
      onChange: (e) => handleDateChange('date_from', e?.$d),
      disabledDate: (current) => toDate && current && current.isAfter(toDate, 'day'),
    },
    {
      label: t('Invoice_EndDate'),
      placeholder: t('Invoice_SelectEndDate'),
      value: date_to,
      onChange: (e) => handleDateChange('date_to', e?.$d),
      disabledDate: (current) => fromDate && current && current.isBefore(fromDate, 'day'),
    },
  ];

  const invoiceSearchInputs = [
    {
      label: isPurchase(invoiceType) ? t('Mã số thuế người bán') : t('Mã số thuế người mua'),
      value: taxNumber,
      paramKey: 'taxNumber',
    },
    {
      label: isPurchase(invoiceType) ? t('Invoice_SellerName') : t('Invoice_BuyerName'),
      value: ten,
      paramKey: 'ten',
    },
    {
      label: t('Ký hiệu hóa đơn'),
      value: khhdon,
      paramKey: 'khhdon',
    },
    { label: t('Số hóa đơn'), value: shdon, paramKey: 'shdon' },
  ];

  return (
    <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <div className="invoice-datatable-filter__left">
        {invoiceDateInputs.map(({ label, placeholder, onChange, disabledDate, value }, index) => (
          <div key={index} className="invoice-datatable-filter__input">
            <span className="label">{label}</span>
            <DatePicker
              placeholder={placeholder}
              onChange={onChange}
              format={DATE_FORMAT_SLASH}
              disabledDate={disabledDate}
              style={inputStyle}
              defaultValue={dayjs(value, DATE_FORMAT_DASH)}
            />
          </div>
        ))}

        {invoiceSearchInputs.map(({ label, value, paramKey }, index) => (
          <div key={index} className="invoice-datatable-filter__input">
            <span className="label">{label}</span>
            <Input
              defaultValue={value}
              onChange={(e) => debouncedFilterChange(paramKey, e?.target?.value)}
              style={inputStyle}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', marginLeft: 'auto' }}>
        <Dropdown menu={downloadMenu} disabled={!invoiceList?.length || loadingDownload}>
          <div>
            <Button
              style={{ marginTop: 20, marginRight: 10 }}
              type="primary"
              size="small"
              outlined
              disabled={!invoiceList?.length || loadingDownload}
              loading={loadingDownload}
            >
              <DownloadOutlined />
              {t('Common_BatchDownload')}
            </Button>
          </div>
        </Dropdown>

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
  );
};
