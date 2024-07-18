import { Button } from '@/components/buttons/buttons';
import { TableWrapper } from '@/container/styled';
import { DownloadOutlined } from '@ant-design/icons';
import { UilFileExport } from '@iconscout/react-unicons';
import { Select, Table } from 'antd';
import PropTypes from 'prop-types';
import { DataTableStyleWrap } from '../style';
import { handleExport } from '../utils';

function DataTable({ rowSelection, tableData, columns, pagination, setState, state, loading }) {
  const handleLoaiHoaDonSearch = (value) => {
    setState((prev) => ({
      ...prev,
      loaiHoaDon: value,
    }));
  };

  return (
    <DataTableStyleWrap>
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
              + Thêm mã hàng
            </Button>

            <Button className="btn-add_new" size="small" type="primary" key="2">
              <UilFileExport />
              Gán mã hàng
            </Button>

            <Button className="btn-add_new" size="small" type="primary" key="3">
              <UilFileExport />
              Gán tài khoản
            </Button>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Button
              type="info"
              size="small"
              outlined
              onClick={() => handleExport(state.date_from || state.date_to)}
              disabled={!state.invoiceList?.length}
            >
              <div style={{ display: 'flex' }}>
                <div>Đồng bộ</div>
              </div>
            </Button>
            <Button
              type="primary"
              size="small"
              outlined
              onClick={() => handleExport(state.date_from || state.date_to)}
              disabled={!state.invoiceList?.length}
            >
              <div style={{ display: 'flex' }}>
                <DownloadOutlined style={{ marginRight: 8, height: 20 }} />
                <div>Xuất Excel</div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div className="ninjadasj-datatable">
        <TableWrapper className="table-data-view table-responsive">
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
