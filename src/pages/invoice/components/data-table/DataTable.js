import { DownloadOutlined } from '@ant-design/icons';
import { UilSearch } from '@iconscout/react-unicons';
import { DatePicker, Select, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button } from '../../../../components/buttons/buttons';
import { DataService } from '../../../../config/dataService/dataService';
import { TableWrapper } from '../../../../container/styled';
import { downloadFile, formatTime } from '../../../../utility/utility';
import { DataTableStyleWrap } from './Style';

function DataTable({
  filterOption,
  rowSelection = false,
  tableData,
  columns,
  pagination,
  state,
  setState,
  getInvoiceList,
}) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleLoaiHoaDonSearch = (value) => {
    setState((prev) => ({
      ...prev,
      loaiHoaDon: value,
    }));
  };

  const handleSearch = () => {
    getInvoiceList(
      state.pagination.current,
      state.pagination.pageSize,
      state.loaiHoaDon,
      state.date_from,
      state.date_to,
    );
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
      {filterOption ? (
        <div className="ninjadash-datatable-filter">
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
            <div className="ninjadash-datatable-filter__action">
              <Button type="primary" size="small" onClick={handleSearch} transparented icon={<UilSearch />}>
                Tìm kiếm
              </Button>
            </div>

            <Button
              style={{ marginLeft: 'auto', marginTop: 20 }}
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
      ) : (
        ''
      )}

      <div className="ninjadasj-datatable">
        <TableWrapper className="table-data-view table-responsive">
          {rowSelection ? (
            <Table
              bordered
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
            />
          ) : (
            <Table
              bordered
              pagination={{ pageSize: 20, showSizeChanger: true, ...pagination }}
              dataSource={tableData}
              columns={columns}
              onChange={(_pagination) => {
                setState((prev) => ({
                  ...prev,
                  pagination: _pagination,
                }));
              }}
            />
          )}
        </TableWrapper>
      </div>
    </DataTableStyleWrap>
  );
}

DataTable.propTypes = {
  filterOption: PropTypes.bool,
  rowSelection: PropTypes.bool,
  tableData: PropTypes.array,
  columns: PropTypes.array,
};
export default DataTable;
