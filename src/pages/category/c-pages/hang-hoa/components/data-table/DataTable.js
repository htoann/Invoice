import { UilFileExport } from '@iconscout/react-unicons';
import { Select, Table } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../../../components/buttons/buttons';
import { TableWrapper } from '../../../../../../container/styled';
import { handleExport } from '../../utils';
import { DataTableStyleWrap } from './Style';

function DataTable({
  filterOption,
  rowSelection,
  tableData,
  columns,
  pagination,
  onchangePagination,
  setState,
  state,
}) {
  const handleLoaiHoaDonSearch = (value) => {
    setState((prev) => ({
      ...prev,
      loaiHoaDon: value,
    }));
  };

  return (
    <DataTableStyleWrap>
      {filterOption ? (
        <div className="ninjadash-datatable-filter">
          <div className="ninjadash-datatable-filter__left">
            <div className="ninjadash-datatable-filter__input">
              <span className="label">Tài khoản thuế (2 tài khoản)</span>
              <Select onChange={handleLoaiHoaDonSearch} style={{ width: 200 }} defaultValue="purchase">
                <Select.Option value="purchase">Mua vào</Select.Option>
                <Select.Option value="sold">Bán ra</Select.Option>
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
            <Button
              onClick={() => {
                setState({
                  ...state,
                  visible: true,
                });
              }}
              className="btn-add_new"
              size="small"
              type="primary"
              key="1"
            >
              <Link to="#">+ Thêm mã hàng</Link>
            </Button>
            <Button
              className="btn-add_new"
              type="primary"
              size="small"
              onClick={() => handleExport(state.date_from || state.date_to)}
              disabled={!state.invoiceList?.length}
              transparented
            >
              <div style={{ display: 'flex' }}>
                <UilFileExport style={{ marginRight: 8, height: 20 }} />
                <div>Xuất Excel</div>
              </div>
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
              // bordered
              rowSelection={{
                ...rowSelection,
              }}
              pagination={{ pageSize: 20, showSizeChanger: true, ...pagination }}
              dataSource={tableData}
              columns={columns}
              onChange={onchangePagination}
            />
          ) : (
            <Table
              // bordered
              pagination={{ pageSize: 20, showSizeChanger: true, ...pagination }}
              dataSource={tableData}
              columns={columns}
              onChange={onchangePagination}
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
