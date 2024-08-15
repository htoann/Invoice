import { Button } from '@/components/buttons/buttons';
import { TableWrapper } from '@/container/styled';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DataTableStyleWrap } from '../style';

function DataTable({ rowSelection, tableData, columns, pagination, setState, state, loading }) {
  const { t } = useTranslation();

  return (
    <DataTableStyleWrap>
      <div className="invoice-datatable-filter">
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
              type="primary"
              key="1"
            >
              + {t('Customer_Create')}
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
  tableData: PropTypes.array,
  columns: PropTypes.array,
};
export default DataTable;
