import { Button } from '@/components/buttons';
import { API_INVOICES_EXCEL, API_INVOICES_ZIP } from '@/service/apiConst';
import { dataService } from '@/service/dataService';
import { downloadFile, formatTime } from '@/utils/index';
import { DownloadOutlined } from '@ant-design/icons';
import { DatePicker, Dropdown, Input, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isPurchase } from '../utils';

export const HeaderTable = ({ state, selectedRowKeys, searchParams, setSearchParams }) => {
  const { t } = useTranslation();

  const { invoiceType, invoiceList } = state;
  const { taxNumber, khmshdon, khhdon, shdon, date_from, date_to } = searchParams;

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [loadingExport, setLoadingExport] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const handleExport = async () => {
    setLoadingExport(true);
    try {
      const response = await dataService.get(
        API_INVOICES_EXCEL,
        {
          loaihdon: invoiceType,
          date_from,
          date_to,
        },
        {
          responseType: 'blob',
        },
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
          date_from,
          date_to,
          type,
          mst: taxNumber,
          ...(selectedRowKeys?.length && { ids: JSON.stringify(selectedRowKeys) }),
        },
        {
          responseType: 'blob',
        },
      );

      downloadFile(response, `HDDT_${formatTime(new Date(), 'YYYYMMDDHHmm')}.zip`);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải hóa đơn. Vui lòng thử lại sau.',
      });
    } finally {
      setLoadingDownload(false);
    }
  };

  const disabledStartDate = (current) => {
    return endDate && current ? current?._d?.getTime() > endDate.getTime() : false;
  };

  const disabledEndDate = (current) => {
    return startDate && current ? current?._d?.getTime() < startDate.getTime() : false;
  };

  const handleStartDateChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      date_from: e?._d ? formatTime(e._d, 'DD-MM-YYYY') : null,
    }));
    setStartDate(e?._d || null);
  };

  const handleEndDateChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      date_to: e?._d ? formatTime(e._d, 'DD-MM-YYYY') : null,
    }));
    setEndDate(e?._d || null);
  };

  const handleFilterChange = (key, value) => {
    setSearchParams((prevParams) => ({ ...prevParams, [key]: value }));
  };

  const downloadProps = {
    items: [
      {
        label: 'PDF',
        key: 'pdf',
      },
      {
        label: 'XML',
        key: 'xml',
      },
    ],
    onClick: ({ key }) => {
      handleDownload(key);
    },
  };

  return (
    <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <div className="invoice-datatable-filter__left" style={{ gap: 10 }}>
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
          <span className="label">
            {isPurchase(invoiceType) ? t('Mã số thuế người bán') : t('Mã số thuế người mua')}
          </span>
          <Input value={taxNumber} onChange={(e) => handleFilterChange('taxNumber', e?.target?.value)} />
        </div>

        <div className="invoice-datatable-filter__input">
          <span className="label">{t('Ký hiệu mẫu số')}</span>
          <Input value={khmshdon} onChange={(e) => handleFilterChange('khmshdon', e?.target?.value)} />
        </div>

        <div className="invoice-datatable-filter__input">
          <span className="label">{t('Ký hiệu hóa đơn')}</span>
          <Input value={khhdon} onChange={(e) => handleFilterChange('khhdon', e?.target?.value)} />
        </div>

        <div className="invoice-datatable-filter__input">
          <span className="label">{t('Số hóa đơn')}</span>
          <Input value={shdon} onChange={(e) => handleFilterChange('shdon', e?.target?.value)} />
        </div>
      </div>

      <div style={{ display: 'flex', marginLeft: 'auto' }}>
        <Dropdown menu={downloadProps}>
          <Button
            style={{ marginTop: 20, marginRight: 10 }}
            type="primary"
            size="small"
            outlined
            disabled={!selectedRowKeys?.length || loadingDownload}
            loading={loadingDownload}
          >
            <DownloadOutlined />
            {t('Common_BatchDownload')}
          </Button>
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
