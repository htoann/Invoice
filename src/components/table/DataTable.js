import UilSearch from '@iconscout/react-unicons/icons/uil-search';
import { Input, Select, Table } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { TableWrapper } from '../../container/styled';
import { dataLiveFilter, filterWithSubmit } from '../../redux/data-filter/actionCreator';
import { Button } from '../buttons/buttons';
import { DataTableStyleWrap } from './Style';

function DataTable({ filterOption, filterOnchange, rowSelection, tableData, columns }) {
  const dispatch = useDispatch();
  const handleIdSearch = (e) => {
    const id = e.currentTarget.value;
    dispatch(dataLiveFilter(id, 'id'));
  };
  const handleStatusSearch = (value) => {
    dispatch(dataLiveFilter(value, 'status'));
  };

  const handleDataUser = (e) => {
    const { value } = e.currentTarget;
    dispatch(dataLiveFilter(value, 'name'));
  };

  const handleSearch = () => {
    const id = document.querySelector('.invoice-data-id').value;
    const status = document.querySelector('.invoice-data-status .ant-select-selection-item').title;
    dispatch(filterWithSubmit(id, status));
  };
  const prefix = <UilSearch />;
  return (
    <DataTableStyleWrap>
      {filterOption ? (
        <div className="invoice-datatable-filter">
          {!filterOnchange ? (
            <div className="invoice-datatable-filter__left">
              <div className="invoice-datatable-filter__input">
                <span className="label">Id:</span>
                <Input className="invoice-data-id" placeholder="Search with Id" />
              </div>
              <div className="invoice-datatable-filter__input">
                <span className="label">Status:</span>
                <Select style={{ width: 200 }} className="invoice-data-status" defaultValue="active">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="deactiveted">Deactivated</Select.Option>
                  <Select.Option value="blocked">Blocked</Select.Option>
                </Select>
              </div>
              <div className="invoice-datatable-filter__action">
                <Button type="primary" size="small" onClick={handleSearch} transparent>
                  Submit
                </Button>
              </div>
            </div>
          ) : (
            <div className="invoice-datatable-filter__left">
              <div className="invoice-datatable-filter__input">
                <span className="label">Id:</span>
                <Input onChange={handleIdSearch} placeholder="Search with Id" />
              </div>
              <div className="invoice-datatable-filter__input">
                <span className="label">Status:</span>
                <Select onChange={handleStatusSearch} style={{ width: 200 }} defaultValue="active">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="deactiveted">Deactivated</Select.Option>
                  <Select.Option value="blocked">Blocked</Select.Option>
                </Select>
              </div>
            </div>
          )}
          <div className="invoice-datatable-filter__right">
            <Input onChange={handleDataUser} size="default" placeholder="Search" prefix={prefix} />
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="invoice-datatable">
        <TableWrapper className="table-data-view table-responsive">
          {rowSelection ? (
            <Table
              rowSelection={{
                // type: state.selectionType,
                ...rowSelection,
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              dataSource={tableData}
              columns={columns}
            />
          ) : (
            <Table pagination={{ pageSize: 10, showSizeChanger: true }} dataSource={tableData} columns={columns} />
          )}
        </TableWrapper>
      </div>
    </DataTableStyleWrap>
  );
}

DataTable.propTypes = {
  filterOption: PropTypes.bool,
  filterOnchange: PropTypes.bool,
  rowSelection: PropTypes.bool,
  tableData: PropTypes.array,
  columns: PropTypes.array,
};
export default DataTable;
