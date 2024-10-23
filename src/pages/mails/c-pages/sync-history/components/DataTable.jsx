import { TableWrapper } from '@/container/style';
import { defaultPaginationConfig } from '@/utils/index';
import { Table } from 'antd';
import { DataTableStyleWrap } from '../style';

function DataTable({ tableData, columns, pagination, setState, loading }) {
  return (
    <DataTableStyleWrap>
      <div className="invoice-datatable" style={{ marginTop: 30 }}>
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

export default DataTable;
