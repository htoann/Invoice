import { useGetMailAccounts } from '@/pages/mails/hooks/useGetMailAccounts';
import { API_INBOXES_BY_ACCOUNT_ID } from '@/utils/apiConst';
import { createOptions, formatTime } from '@/utils/index';
import UilInbox from '@iconscout/react-unicons/icons/uil-inbox';
import { Empty, Input, Pagination, Select, Skeleton } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useAppState } from 'context/AppContext';
import { useGetOrgStructure } from 'hooks/useGetOrgStructure';
import { useList } from 'hooks/useListCommon';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { EmailNav } from './style';

export const InboxList = React.memo(({ setSelectedInbox, selectedInbox }) => {
  const { t } = useTranslation();

  const [pagination, setPagination] = useState({
    pageSize: 20,
    current: 1,
    total: 0,
  });

  const { pageSize, current, total } = pagination;

  useGetOrgStructure();

  const {
    loadingDepartments,
    departments,
    selectedDepartmentId,
    setSelectedDepartmentId,

    projects,
    loadingProjects,
    selectedProjectId,
    setSelectedProjectId,
  } = useAppState();

  const [search, setSearchSender] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const selectFirstAccount = (accountList) => {
    setSelectedAccountId(accountList[0].id);
  };

  const { mailAccountList, loadingMailAccounts } = useGetMailAccounts(
    selectFirstAccount,
    selectedDepartmentId,
    selectedProjectId,
  );

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
    setSelectedAccountId(null);
  }, [selectedDepartmentId]);

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
      current: 1,
    });
    setSelectedInbox(null);
  };

  const accountOptions = createOptions(mailAccountList, 'email', false);
  const departmentOptions = createOptions(departments, 'name');
  const projectOptions = createOptions(projects, 'name');

  const handleChangeDepartment = (value) => {
    setSelectedDepartmentId(value);
    setSelectedProjectId('');
    setSelectedAccountId(null);
    handleReset();
  };

  const handleChangeProject = (value) => {
    setSelectedProjectId(value);
    setSelectedAccountId(null);
    handleReset();
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', flexDirection: 'column' }}>
        <>
          <span className="label mb-8">{t('Common_Department')}</span>
          <Select
            popupClassName="dropdown-select"
            style={{ width: '100%', marginBottom: 20 }}
            placeholder={t('Common_SelectDepartment')}
            onChange={handleChangeDepartment}
            loading={loadingDepartments}
            disabled={loadingDepartments}
            value={selectedDepartmentId}
            options={departmentOptions}
          />

          <span className="label mb-8">{t('Common_Project')}</span>
          <Select
            style={{ width: '100%', marginBottom: 20 }}
            popupClassName="dropdown-select"
            loading={loadingProjects}
            disabled={loadingProjects || !selectedDepartmentId}
            onChange={handleChangeProject}
            value={selectedProjectId}
            options={projectOptions}
          />
        </>
      </div>

      <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', flexDirection: 'column' }}>
        <span className="label mb-8">{t('Common_Account')}</span>
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

      {!loadingMailAccounts && !loadingDepartments && inboxList?.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <Pagination
            current={current}
            pageSize={pageSize}
            onChange={handlePageChange}
            total={total}
            showSizeChanger
            onShowSizeChange={(current, size) => setPagination((prev) => ({ ...prev, pageSize: size }))}
            showLessItems
          />
        </div>
      )}

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
});
