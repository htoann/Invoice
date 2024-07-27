import { DataService } from '@/config/dataService';
import { formatTime } from '@/utils/index';
import UilInbox from '@iconscout/react-unicons/icons/uil-inbox';
import { Empty, Input, Pagination, Select, Skeleton } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import useAccounts from 'hooks/useAccounts';
import useDepartments from 'hooks/useDepartments';
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

  const [searchSender, setSearchSender] = useState('');
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectFirstAccount = (results) => {
    setSelectedUsername(results[0].email);
  };

  const { loadingDepartments, departments } = useDepartments();
  const { accountList, loadingUsers } = useAccounts(selectFirstAccount, selectedDepartmentId);

  const getList = async ({ searchSender = '', page = 1, page_size = 20, username = '' } = {}) => {
    try {
      setLoading(true);
      const response = await DataService.get('/mails/inbox/', {
        sender: searchSender,
        page,
        page_size,
        username: 'huutrantoan@gmail.com',
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
    getList({ searchSender, page: current, page_size: pageSize, username: selectedUsername });
  }, [selectedUsername, current, pageSize]);

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
    accountList?.length > 0 &&
    accountList.map((item) => ({
      value: item.email,
      label: item.email,
    }));

  const departmentsSelect = [
    { label: t('Common_All'), value: '' },
    ...departments.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  ];

  // console.log(inboxList);

  return (
    <>
      <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', flexDirection: 'column' }}>
        {!loadingDepartments && (
          <>
            <span className="label mb-8">{t('Common_SelectDepartment')}</span>
            <Select
              popupClassName="dropdown-select"
              style={{ width: '100%', marginBottom: 20 }}
              placeholder={t('Common_SelectDepartment')}
              onChange={(value) => {
                setSelectedDepartmentId(value);
                setSelectedUsername('');
                handleReset();
              }}
              loading={loadingDepartments}
              disabled={loadingDepartments}
              defaultValue=""
              options={departmentsSelect}
            />
          </>
        )}
      </div>

      {!loadingUsers && (
        <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', flexDirection: 'column' }}>
          <span className="label mb-8">{t('Common_SelectAccount')}</span>
          <Select
            popupClassName="dropdown-select"
            style={{ width: '100%', marginBottom: 20 }}
            placeholder={t('Common_SelectAccount')}
            onChange={(value) => {
              setSelectedUsername(value);
              handleReset();
            }}
            loading={loadingUsers}
            disabled={loadingUsers}
            defaultValue={selectedUsername}
            options={accountsSelect}
          />
        </div>
      )}

      {!loadingDepartments && (
        <Input
          style={{ width: '100%', marginBottom: 20, height: 40 }}
          placeholder={t('Mail_SearchBySender')}
          value={searchSender}
          onChange={(event) => {
            setSearchSender(event.target.value);
          }}
          onPressEnter={() => {
            getList({ searchSender, page_size: pageSize, username: selectedUsername });
            resetCurrentPage();
          }}
        />
      )}

      {!loadingUsers && !loadingDepartments && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
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

      {loading || loadingUsers ? (
        <div style={{ minHeight: 'calc(100vh - 230px)' }}>
          <Skeleton active />
          <Skeleton style={{ marginTop: 10 }} active />
          <Skeleton style={{ marginTop: 10 }} active />
        </div>
      ) : (
        <>
          <EmailNav>
            <ul>
              {inboxList?.length > 0 ? (
                inboxList.map((item) => (
                  <li key={item.id}>
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
                            <Paragraph className="email-subject" ellipsis>
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
                ))
              ) : (
                <Empty description={t('Common_NoEmailsFound')} />
              )}
            </ul>
          </EmailNav>
        </>
      )}
    </>
  );
});
