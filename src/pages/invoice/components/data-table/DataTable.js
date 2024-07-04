import { UilFileExport, UilSearch } from '@iconscout/react-unicons';
import { DatePicker, Select, Table } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '../../../../components/buttons/buttons';
import { DataService } from '../../../../config/dataService/dataService';
import { TableWrapper } from '../../../../container/styled';
import { downloadFile } from '../../../../utility/utility';
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

      downloadFile(response, `HDDT${dayjs(state.date_from || state.date_to).format('DDMMYYYYHHmmss')}.xlsx`);
    } catch (error) {
      console.log(error);
    }
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
                    date_from: e?._d ? dayjs(e._d).format('DD-MM-YYYY') : null,
                  }));
                }}
                format="DD/MM/yyyy"
              />
            </div>
            <div className="ninjadash-datatable-filter__input">
              <span className="label">Ngày kết thúc</span>
              <DatePicker
                placeholder="Chọn ngày kết thúc"
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    date_to: e?._d ? dayjs(e._d).format('DD-MM-YYYY') : null,
                  }));
                }}
                format="DD/MM/yyyy"
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
              onClick={handleExport}
              disabled={!state.invoiceList?.length}
              transparented
            >
              Xuất Excel
              <UilFileExport style={{ marginLeft: 8 }} />
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
