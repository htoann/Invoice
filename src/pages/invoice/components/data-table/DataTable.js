import UilSearch from '@iconscout/react-unicons/icons/uil-search';
import { DatePicker, Select, Table } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../components/buttons/buttons';
import { TableWrapper } from '../../../../container/styled';
import { dataLiveFilter, filterWithSubmit } from '../../../../redux/data-filter/actionCreator';
import { DataTableStyleWrap } from './Style';

function DataTable({ filterOption, filterOnchange, rowSelection = false, tableData, columns, pagination, setState }) {
  const dispatch = useDispatch();

  const handleIdSearch = (e) => {
    const id = e.currentTarget.value;
    dispatch(dataLiveFilter(id, 'id'));
  };

  const handleLoaiHoaDonSearch = (value) => {
    setState((prev) => ({
      ...prev,
      loaiHoaDon: value,
    }));
  };

  const handleDataUser = (e) => {
    const { value } = e.currentTarget;
    dispatch(dataLiveFilter(value, 'name'));
  };

  const handleSearch = () => {
    const id = document.querySelector('.ninjadash-data-id').value;
    const status = document.querySelector('.ninjadash-data-status .ant-select-selection-item').title;
    dispatch(filterWithSubmit(id, status));
  };

  const prefix = <UilSearch />;

  return (
    <DataTableStyleWrap>
      {filterOption ? (
        <div className="ninjadash-datatable-filter">
          {!filterOnchange ? (
            <div className="ninjadash-datatable-filter__left">
              {/* <div className="ninjadash-datatable-filter__input">
                <span className="label">Id:</span>
                <Input className="ninjadash-data-id" placeholder="Search with Id" />
              </div> */}
              <div className="ninjadash-datatable-filter__input">
                <span className="label">Loại hóa đơn</span>
                <Select style={{ width: 200 }} className="ninjadash-data-status" defaultValue="purchase">
                  <Select.Option value="purchase">Mua vào</Select.Option>
                  <Select.Option value="sold">Bán ra</Select.Option>
                </Select>
              </div>
              <div className="ninjadash-datatable-filter__input">
                <span className="label">Ngày bắt đầu</span>
                <DatePicker
                  placeholder="Chọn ngày bắt đầu"
                  onChange={() => {
                    console.log();
                  }}
                />
              </div>
              <div className="ninjadash-datatable-filter__input">
                <span className="label">Ngày kết thúc</span>
                <DatePicker
                  placeholder="Chọn ngày kết thúc"
                  onChange={() => {
                    console.log();
                  }}
                />
              </div>
              <div className="ninjadash-datatable-filter__action">
                <Button type="primary" size="small" onClick={handleSearch} transparented>
                  Tìm kiếm
                </Button>
              </div>
            </div>
          ) : (
            <div className="ninjadash-datatable-filter__left">
              {/* <div className="ninjadash-datatable-filter__input">
                <span className="label">Id:</span>
                <Input onChange={handleIdSearch} placeholder="Search with Id" />
              </div> */}
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
                      date_from: new Date(e._d),
                    }));
                  }}
                />
              </div>
              <div className="ninjadash-datatable-filter__input">
                <span className="label">Ngày kết thúc</span>
                <DatePicker
                  placeholder="Chọn ngày kết thúc"
                  onChange={(e) => {
                    setState((prev) => ({
                      ...prev,
                      date_from: new Date(e._d),
                    }));
                  }}
                />
              </div>
              <div className="ninjadash-datatable-filter__action">
                <Button type="primary" size="small" onClick={handleSearch} transparented>
                  Tìm kiếm
                </Button>
              </div>
            </div>
          )}
          {/* <div className="ninjadash-datatable-filter__right">
            <Input onChange={handleDataUser} size="default" placeholder="Search" prefix={prefix} />
          </div> */}
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
  filterOnchange: PropTypes.bool,
  rowSelection: PropTypes.bool,
  tableData: PropTypes.array,
  columns: PropTypes.array,
};
export default DataTable;
