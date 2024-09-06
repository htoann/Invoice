import { API_INBOXES_BY_ACCOUNT_ID } from '@/utils/apiConst';
import { Empty, Input, Skeleton } from 'antd';
import { useAppState } from 'context/AppContext';
import { useList } from 'hooks/useListCommon';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { InboxPagination } from './InboxPagination';
import { ListItem } from './ListItem';

export const InboxList = ({
  setSelectedInbox,
  selectedInbox,
  pagination,
  setPagination,
  search,
  setSearchSender,
  loadingMailAccounts,
}) => {
  const { t } = useTranslation();

  const { pageSize, current } = pagination;

  const { selectedDepartmentId, setSelectedAccountId, selectedAccountId } = useAppState();

  const {
    list: inboxList,
    loading,
    getList,
    setList: setInboxList,
  } = useList(pagination, setPagination, API_INBOXES_BY_ACCOUNT_ID(selectedAccountId), 'hộp thư');

  useEffect(() => {
    selectedAccountId && getList({ search, accountId: selectedAccountId });
  }, [selectedAccountId, current, pageSize]);

  useEffect(() => {
    setInboxList([]);
  }, [selectedAccountId]);

  useEffect(() => {
    setSelectedAccountId('');
  }, [selectedDepartmentId]);

  const resetCurrentPage = () => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  return (
    <>
      <Input
        style={{ width: '100%', height: 40 }}
        placeholder={t('Mail_Search')}
        value={search}
        onChange={(event) => {
          setSearchSender(event.target.value);
        }}
        onPressEnter={() => {
          getList({ search, accountId: selectedAccountId });
          resetCurrentPage();
          setSelectedInbox(null);
        }}
      />

      <InboxPagination
        loadingMailAccounts={loadingMailAccounts}
        pagination={pagination}
        setPagination={setPagination}
        inboxList={inboxList}
      />

      {loading || loadingMailAccounts ? (
        <>
          <Skeleton active style={{ marginTop: 20 }} />
          <Skeleton style={{ marginTop: 10 }} active />
        </>
      ) : (
        <>
          {inboxList?.length > 0 ? (
            <ListItem inboxList={inboxList} selectedInbox={selectedInbox} setSelectedInbox={setSelectedInbox} />
          ) : (
            <Empty description={t('Common_NoEmailsFound')} style={{ margin: 'auto' }} />
          )}
        </>
      )}
    </>
  );
};
