import { Table } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { TableWrapper } from '../../../../container/styled';
import { DataTableStyleWrap } from './style';

function DataTable({ tableData, columns, pagination, state, setState, getList }) {
  return (
    <DataTableStyleWrap>
      <div className="ninjadasj-datatable" style={{ marginTop: 30 }}>
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
