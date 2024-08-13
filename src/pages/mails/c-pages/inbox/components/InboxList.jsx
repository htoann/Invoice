import { API_INBOXES_BY_ACCOUNT_ID } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { formatTime } from '@/utils/index';
import UilInbox from '@iconscout/react-unicons/icons/uil-inbox';
import { Empty, Input, Pagination, Select, Skeleton } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import useGetAllDepartments from 'hooks/useGetAllDepartments';
import useMailAccounts from 'hooks/useMailAccounts';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { EmailNav } from './style';

export const InboxList = React.memo(({ setSelectedInbox, selectedInbox }) => {
  const { t } = useTranslation();

  const [pagination, setPagination] = useState({
    pageSize: 20,
    showSizeChanger: true,
    current: 1,
    total: 0,
  });

  const { pageSize, current, total } = pagination;

  const [inboxList, setInboxList] = useState([]);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const [search, setSearchSender] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectFirstAccount = (results) => {
    setSelectedAccountId(results[0].id);
  };

  const { loadingDepartments, departments } = useGetAllDepartments();
  const { mailAccountList, loadingMailAccounts } = useMailAccounts(selectFirstAccount, selectedDepartmentId);

  const getList = async ({ accountId, search = '', page = 1, page_size = 20 } = {}) => {
    try {
      setLoading(true);
      const response = await dataService.get(API_INBOXES_BY_ACCOUNT_ID(accountId), {
        search,
        page,
        page_size,
      });

      setInboxList(response?.data?.results);
      setPagination((prev) => ({
        ...prev,
        total: Number(response?.data?.count) || 0,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAccountId) getList({ search, page: current, page_size: pageSize, accountId: selectedAccountId });
  }, [selectedAccountId, current, pageSize]);

  const resetCurrentPage = () => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize,
    }));
  };

  const handleReset = () => {
    setSearchSender('');
    setPagination({
      pageSize: 20,
      showSizeChanger: true,
      current: 1,
      total: 0,
    });
  };

  const accountsSelect =
    mailAccountList?.length > 0 &&
    mailAccountList.map((item) => ({
      value: item.id,
      label: item.email,
    }));

  const departmentsSelect = [
    { label: t('Common_All'), value: '' },
    ...departments.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', flexDirection: 'column' }}>
        <>
          <span className="label mb-8">{t('Common_SelectDepartment')}</span>
          <Select
            popupClassName="dropdown-select"
            style={{ width: '100%', marginBottom: 20 }}
            placeholder={t('Common_SelectDepartment')}
            onChange={(value) => {
              setSelectedDepartmentId(value);
              setSelectedAccountId('');
              handleReset();
            }}
            loading={loadingDepartments}
            disabled={loadingDepartments}
            defaultValue=""
            options={departmentsSelect}
          />
        </>
      </div>

      {!loadingMailAccounts && (
        <>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', flexDirection: 'column' }}>
            <span className="label mb-8">{t('Common_SelectAccount')}</span>
            <Select
              popupClassName="dropdown-select"
              style={{ width: '100%', marginBottom: 20 }}
              placeholder={t('Common_SelectAccount')}
              onChange={(value) => {
                setSelectedAccountId(value);
                handleReset();
              }}
              loading={loadingMailAccounts}
              disabled={loadingMailAccounts}
              defaultValue={selectedAccountId}
              options={accountsSelect}
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
              getList({ search, page_size: pageSize, accountId: selectedAccountId });
              resetCurrentPage();
            }}
          />
        </>
      )}

      {!loadingMailAccounts && !loadingDepartments && inboxList?.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <Pagination
            current={current}
            pageSize={pageSize}
            onChange={handlePageChange}
            total={total}
            showSizeChanger
            onShowSizeChange={(current, size) => setPagination((prev) => ({ ...prev, pageSize: size }))}
          />
        </div>
      )}

      {loading || loadingMailAccounts ? (
        <>
          <Skeleton active />
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
});
