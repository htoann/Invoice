import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { BorderLessHeading, Main } from '@/container/styled';
import axios from '@/mock/index';
import { Col, Input, Row, Select, Skeleton } from 'antd';
import useAccounts from 'hooks/useAccounts';
import { useEffect, useState } from 'react';
import DataTable from './components/DataTable';

export const SyncHistory = () => {
  const [state, setState] = useState({
    pagination: { pageSize: 20, showSizeChanger: true, current: 1, total: 0 },
  });

  const { pagination } = state;
  const { current, pageSize } = pagination;

  const [list, setList] = useState([]);
  const [isLoadingGetList, setIsLoadingGetList] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ status: '', note: '', accountId: '' });

  const { loadingUsers, accountList } = useAccounts();

  const getList = async ({
    status = null,
    note = '',
    accountId = '',
    page = 1,
    page_size = 20,
    searchLoading = true,
  } = {}) => {
    try {
      if (searchLoading) {
        setSearchLoading(true);
      } else {
        setIsLoadingGetList(true);
      }

      const response = await axios.get('/sync-history', {
        status,
        note,
        page,
        page_size,
        account_id: accountId,
      });

      if (response?.data) {
        setList(response?.data?.results);
        setState((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: Number(response?.data?.count) || 0,
          },
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (searchLoading) {
        setSearchLoading(false);
      } else {
        setIsLoadingGetList(false);
      }
    }
  };

  useEffect(() => {
    getList({ ...searchParams, page: current, page_size: pageSize });
  }, [current, pageSize]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const tableDataSource = [];

  if (list?.length > 0) {
    list.map((item, index) => {
      const { id, time, query, status, note, totalInvoice, newInvoice } = item;

      return tableDataSource.push({
        key: id,
        stt: (current - 1) * pageSize + index + 1,
        id,
        time: <span>{time}</span>,
        query: <span>{query}</span>,
        status: <span>{status === 1 ? 'Thành công' : 'Thất bại'}</span>,
        note: <span>{note}</span>,
        totalInvoice: <span>{totalInvoice}</span>,
        newInvoice: <span>{newInvoice}</span>,
      });
    });
  }

  const customHeader = (title, name) => (
    <>
      <div>{title}</div>
      <Input
        style={{ width: 'auto', height: 35, marginTop: 10 }}
        onClick={stopPropagation}
        onFocus={stopPropagation}
        value={searchParams[name]}
        onChange={(e) => {
          e.stopPropagation();
          setSearchParams({ ...searchParams, [name]: e.target.value.toLowerCase() });
        }}
        onKeyDown={(e) => {
          stopPropagation(e);
          if (e.key === 'Enter') {
            setState({
              ...state,
              pagination: { ...pagination, current: 1 },
            });
            getList({ ...searchParams, shouldLoading: false, page_size: pageSize });
          }
        }}
      />
    </>
  );

  const dataTableColumn = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => a.time.props.children.localeCompare(b.time.props.children),
    },
    {
      title: 'Query',
      dataIndex: 'query',
      key: 'query',
      sorter: (a, b) => a.query.props.children.localeCompare(b.query.props.children),
    },
    {
      title: <>{customHeader('Trạng thái', 'status')}</>,
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.props.children > b.status.props.children,
      className: 'searchInput',
    },
    {
      title: <>{customHeader('Ghi chú', 'note')}</>,
      dataIndex: 'note',
      key: 'note',
      sorter: (a, b) => a.note.props.children.localeCompare(b.note.props.children),
      className: 'searchInput',
    },
    {
      title: 'Tổng số hoá đơn',
      dataIndex: 'totalInvoice',
      key: 'totalInvoice',
      sorter: (a, b) => a.totalInvoice.props.children > b.totalInvoice.props.children,
    },
    {
      title: 'Hoá đơn mới',
      dataIndex: 'newInvoice',
      key: 'newInvoice',
      sorter: (a, b) => a.newInvoice.props.children > b.newInvoice.props.children,
    },
  ];

  const handleSelectAccount = (accountId) => {
    setSearchParams({ ...searchParams, accountId });
    getList({ ...searchParams, shouldLoading: false, page_size: pageSize, accountId });
  };

  return (
    <>
      <PageHeader className="invoice-page-header-main" title="Danh sách email" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'auto' }}>
                  <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', alignItems: 'center' }}>
                    <span className="label">Chọn tài khoản</span>
                    <Select
                      popupClassName="dropdown-select"
                      loading={loadingUsers}
                      disabled={loadingUsers}
                      onChange={handleSelectAccount}
                      style={{ width: 200, marginLeft: 10 }}
                      defaultValue=""
                    >
                      <Select.Option value="">Tất cả</Select.Option>
                      {accountList?.length > 0 &&
                        accountList.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>
                </div>
                {isLoadingGetList ? (
                  <Skeleton active style={{ marginTop: 30 }} />
                ) : (
                  <DataTable
                    tableData={tableDataSource}
                    columns={dataTableColumn}
                    pagination={pagination}
                    setState={setState}
                    loading={searchLoading}
                  />
                )}
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>
    </>
  );
};
