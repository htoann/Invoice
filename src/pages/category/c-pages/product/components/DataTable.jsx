import { Button } from '@/components/buttons/buttons';
import { TableWrapper } from '@/container/styled';
import { DownloadOutlined } from '@ant-design/icons';
import { UilFileExport } from '@iconscout/react-unicons';
import { Select, Table } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DataTableStyleWrap } from '../style';
import { handleExport } from '../utils';

function DataTable({ rowSelection, tableData, columns, pagination, setState, state, loading }) {
  const { t } = useTranslation();

  const handleLoaiHoaDonSearch = (value) => {
    setState((prev) => ({
      ...prev,
      loaiHoaDon: value,
    }));
  };

  const handleDongBo = () => {};

  return (
    <DataTableStyleWrap>
      <div className="invoice-datatable-filter">
        <div className="invoice-datatable-filter__left">
          <div className="invoice-datatable-filter__input">
            <span className="label">{t('Common_TaxAccount')}</span>
            <Select onChange={handleLoaiHoaDonSearch} style={{ width: 200 }} defaultValue="purchase">
              <Select.Option value="purchase">{t('Common_Purchase')}</Select.Option>
              <Select.Option value="sold">{t('Common_Sold')}</Select.Option>
            </Select>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginRight: 'auto',
            marginTop: 10,
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Button
              onClick={() => {
                setState({
                  ...state,
                  visible: true,
                });
              }}
              className="btn-add_new"
              size="small"
              type="success"
              key="1"
            >
              + {t('Product_AddNew')}
            </Button>

            <Button className="btn-add_new" size="small" type="primary" key="2">
              <UilFileExport />
              {t('Product_AssignProductCode')}
            </Button>

            <Button className="btn-add_new" size="small" type="primary" key="3">
              <UilFileExport />
              {t('Product_AssignAccount')}
            </Button>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Button
              type="info"
              size="small"
              outlined
              onClick={() => handleDongBo()}
              disabled={!state.invoiceList?.length}
            >
              <div style={{ display: 'flex' }}>
                <div>{t('Common_Sync')}</div>
              </div>
            </Button>
            <Button
              type="primary"
              size="small"
              outlined
              onClick={() => handleExport()}
              disabled={!state.invoiceList?.length}
            >
              <div style={{ display: 'flex' }}>
                <DownloadOutlined style={{ marginRight: 8, height: 20 }} />
                <div>{t('Common_ExportExcel')}</div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div className="invoice-datatable">
        <TableWrapper className="table-data-view table-responsive">
          <Table
            className="table-search-selection"
            rowSelection={{
              ...rowSelection,
            }}
            pagination={{ pageSize: 20, showSizeChanger: true, ...pagination }}
            dataSource={tableData}
            columns={columns}
            onChange={(_pagination) => {
              setState((prev) => ({
                ...prev,
                pagination: _pagination,
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
  rowSelection: PropTypes.bool,
  tableData: PropTypes.array,
  columns: PropTypes.array,
};
export default DataTable;