import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { MailAccountSelect } from '@/components/select-common/MailAccountSelect';
import { Tag } from '@/components/tags/tags';
import { BorderLessHeading, Main } from '@/container/styled';
import { API_MAIL_TASK_HISTORIES } from '@/utils/apiConst';
import { Col, Row } from 'antd';
import { useList } from 'hooks/useListCommon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from './components/DataTable';
import { useTableColumnSyncHistory } from './hooks/useDataTable';

const SyncHistory = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    pagination: { current: 1, pageSize: 20 },
  });
  const [searchParams, setSearchParams] = useState({ state: '', note: '', accountId: '' });

  const { pagination } = state;
  const { current, pageSize } = pagination;

  const { list, loading, getList } = useList(state, setState, API_MAIL_TASK_HISTORIES, 'lịch sử đồng bộ');

  useEffect(() => {
    getList(searchParams);
  }, [current, pageSize, searchParams]);

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
    setState,
  });

  const handleSelectAccount = (accountId) => {
    setSearchParams({ ...searchParams, accountId });
    getList({ ...searchParams, accountId });
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
                <DataTable
                  tableData={tableDataSource}
                  columns={dataTableColumn}
                  pagination={pagination}
                  setState={setState}
                  loading={loading}
                />
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default SyncHistory;
