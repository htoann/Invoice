import { useGetMailAccounts } from '@/pages/mails/hooks/useGetMailAccounts';
import { API_INBOXES_BY_ACCOUNT_ID } from '@/service';
import { createOptions } from '@/utils/index';
import { Empty, Input, Select, Skeleton } from 'antd';
import { useAppState } from 'context/AppContext';
import { useList } from 'hooks/useListCommon';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { InboxPagination } from './InboxPagination';
import { ListItem } from './ListItem';

export const InboxList = ({ setSelectedInbox, selectedInbox, pagination, setPagination, search, setSearchSender }) => {
  const { t } = useTranslation();

  const { pageSize, current } = pagination;

  const { setSelectedAccountId, selectedAccountId } = useAppState();

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

  const resetCurrentPage = () => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleReset = () => {
    setSearchSender('');
    setPagination({
      pageSize: 20,
      current: 1,
    });
    setSelectedInbox(null);
  };

  const { mailAccountList, loadingMailAccounts } = useGetMailAccounts();

  const accountOptions = createOptions(mailAccountList, 'email', false);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className="label">{t('Common_Account')}</span>
        <Select
          popupClassName="dropdown-select"
          style={{ width: '100%', marginTop: 10, marginBottom: 20 }}
          placeholder={t('Common_SelectAccount')}
          onChange={(value) => {
            setSelectedAccountId(value);
            handleReset();
          }}
          loading={loadingMailAccounts}
          disabled={loadingMailAccounts}
          value={selectedAccountId}
          options={accountOptions}
          key={selectedAccountId}
        />
      </div>

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
        <div style={{ margin: 20 }}>
          <Skeleton active style={{ marginTop: 20 }} />
          <Skeleton style={{ marginTop: 10 }} active />
        </div>
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
