import { DownloadOutlined } from '@ant-design/icons';
import { UilSearch } from '@iconscout/react-unicons';
import { DatePicker, Select, Table } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from '../../../components/buttons/buttons';
import { DataService } from '../../../config/dataService/dataService';
import { TableWrapper } from '../../../container/styled';
import { downloadFile, formatTime } from '../../../utility/utility';
import { DataTableStyleWrap } from '../style';

function DataTable({ loading, tableData, columns, pagination, state, setState, getInvoiceList }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleLoaiHoaDonSearch = (value) => {
    setState({
      ...state,
      pagination: { ...pagination, current: 1 },
      loaiHoaDon: value,
    });
    getInvoiceList(1, state.pagination.pageSize, value, state.date_from, state.date_to, true);
  };

  const handleSearch = () => {
    setState({
      ...state,
      pagination: { ...pagination, current: 1 },
    });
    getInvoiceList(1, state.pagination.pageSize, state.loaiHoaDon, state.date_from, state.date_to, true);
  };

  const handleExport = async () => {
    try {
      const response = await DataService.get('invoices_excel/', {
        responseType: 'blob',
      });

      downloadFile(response, `HDDT${formatTime(state.date_from || state.date_to)}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  };

  const disabledStartDate = (current) => {
    return endDate && current ? current?._d.getTime() > endDate.getTime() : false;
  };

  const disabledEndDate = (current) => {
    return startDate && current ? current?._d.getTime() < startDate.getTime() : false;
  };

  return (
    <DataTableStyleWrap>
      <div className="ninjadash-datatable-filter">
        <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="ninjadash-datatable-filter__left">
            <div className="ninjadash-datatable-filter__input">
              <span className="label">Loại hóa đơn</span>
              <Select onChange={handleLoaiHoaDonSearch} style={{ width: 200 }} defaultValue="purchase">
                <Select.Option value="purchase">Mua vào</Select.Option>
                <Select.Option value="sold">Bán ra</Select.Option>
              </Select>
            </div>
            <div className="ninjadash-datatable-filter__input">
              <span className="label">Ngày bắt đầu</span>
              <DatePicker
                placeholder="Chọn ngày bắt đầu"
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
            <div className="ninjadash-datatable-filter__input">
              <span className="label">Ngày kết thúc</span>
              <DatePicker
                placeholder="Chọn ngày kết thúc"
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
            <div className="ninjadash-datatable-filter__action" style={{ marginRight: 10 }}>
              <Button type="primary" size="small" onClick={handleSearch} transparented icon={<UilSearch />}>
                Tìm kiếm
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
            Xuất Excel
          </Button>
        </div>
      </div>

      <div className="ninjadasj-datatable">
        <TableWrapper className="table-data-view table-responsive">
          <Table
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
  tableData: PropTypes.array,
  columns: PropTypes.array,
};
export default DataTable;
