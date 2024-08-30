import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { MailAccountSelect } from '@/components/select-common/MailAccountSelect';
import { Tag } from '@/components/tags/tags';
import { BorderLessHeading, Main } from '@/container/styled';
import axios from '@/mock/index';
import { API_MAIL_TASK_HISTORIES } from '@/utils/apiConst';
import { Col, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from './components/DataTable';
import { useTableColumnSyncHistory } from './hooks/useDataTable';

const SyncHistory = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    pagination: { current: 1, pageSize: 20 },
  });

  const { pagination } = state;
  const { current, pageSize } = pagination;

  const [list, setList] = useState([]);
  const [isLoadingGetList, setIsLoadingGetList] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ state: '', note: '', accountId: '' });

  const getList = async ({
    state = null,
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

      const response = await axios.get(API_MAIL_TASK_HISTORIES, {
        state,
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

  const tableDataSource = list.map((item, index) => {
    const { id, time, name, state, note, totalInvoice, newInvoice } = item;
    return {
      key: id,
      stt: (current - 1) * pageSize + index + 1,
      id,
      time: <span>{time}</span>,
      name: <span>{name}</span>,
      state: (
        <Tag color={state === 1 ? '#01b81a' : '#f5222d'}>{state === 1 ? t('Common_Success') : t('Common_Failure')}</Tag>
      ),
      note: <span>{note}</span>,
      totalInvoice: <span>{totalInvoice}</span>,
      newInvoice: <span>{newInvoice}</span>,
    };
  });

  const dataTableColumn = useTableColumnSyncHistory({
    searchParams,
    setSearchParams,
    getList,
    state,
    setState,
    pagination,
    pageSize,
  });

  const handleSelectAccount = (accountId) => {
    setSearchParams({ ...searchParams, accountId });
    getList({ ...searchParams, shouldLoading: false, page_size: pageSize, accountId });
  };

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_SyncHistory')} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'auto' }}>
                  <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', alignItems: 'center' }}>
                    <MailAccountSelect onChange={handleSelectAccount} value={searchParams?.accountId} />
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

export default SyncHistory;
