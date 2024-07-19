import { TableWrapper } from '@/container/styled';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { DataTableStyleWrap } from '../style';

function DataTable({ tableData, columns, pagination, setState, loading }) {
  return (
    <DataTableStyleWrap>
      <div className="invoice-datatable" style={{ marginTop: 30 }}>
        <TableWrapper className="table-data-view table-responsive">
          <Table
            className="table-search"
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
