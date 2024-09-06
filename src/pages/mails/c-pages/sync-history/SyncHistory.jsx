import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { MailAccountSelect } from '@/components/select-common/MailAccountSelect';
import { BorderLessHeading, Main } from '@/container/styled';
import { API_MAIL_TASK_HISTORIES } from '@/utils/apiConst';
import { Col, Row } from 'antd';
import { useList } from 'hooks/useListCommon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from './components/DataTable';
import { useTableColumnSyncHistory } from './hooks/useDataTable';
import { useTableDataSource } from './hooks/useTableDataSource';

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

  const tableDataSource = useTableDataSource(list, current, pageSize);

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
