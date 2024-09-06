import { API_INBOXES_BY_ACCOUNT_ID } from '@/utils/apiConst';
import { formatTime } from '@/utils/index';
import UilInbox from '@iconscout/react-unicons/icons/uil-inbox';
import { Empty, Input, Skeleton } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useAppState } from 'context/AppContext';
import { useList } from 'hooks/useListCommon';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { InboxPagination } from './InboxPagination';
import { EmailNav } from './style';

export const InboxList = React.memo(
  ({ setSelectedInbox, selectedInbox, pagination, setPagination, search, setSearchSender, loadingMailAccounts }) => {
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
      if (selectedAccountId) getList({ search, accountId: selectedAccountId });
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
              <EmailNav>
                <ul>
                  {inboxList?.length > 0 &&
                    inboxList.map((item) => (
                      <li key={item.id} style={{ marginBottom: 5 }}>
                        <Link
                          className={item?.id === selectedInbox?.id ? 'active' : ''}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedInbox(item);
                          }}
                        >
                          <UilInbox />
                          <span className="nav-text">
                            <div className="email-container">
                              <div className="email-content">
                                <Paragraph className="email-subject" ellipsis title={item?.subject}>
                                  {item?.subject}
                                </Paragraph>
                                <Paragraph
                                  className="email-sender"
                                  ellipsis
                                  style={{
                                    width: '100%',
                                    marginBottom: 0,
                                    lineHeight: '1.2rem',
                                  }}
                                  title={item?.sender}
                                >
                                  {item?.sender}
                                </Paragraph>
                              </div>
                              <span className="email-date">{formatTime(item?.date, 'DD/MM/YY')}</span>
                            </div>
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </EmailNav>
            ) : (
              <Empty description={t('Common_NoEmailsFound')} style={{ margin: 'auto' }} />
            )}
          </>
        )}
      </>
    );
  },
);
