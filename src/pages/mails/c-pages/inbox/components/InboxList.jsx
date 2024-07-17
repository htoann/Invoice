import axios from '@/mock/index';
import UilInbox from '@iconscout/react-unicons/icons/uil-inbox';
import { Input, Pagination, Select, Skeleton } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import useDepartments from 'hooks/useDepartments';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailNav } from './style';

export const InboxList = React.memo(({ setSelectedInbox, selectedInbox }) => {
  const [pagination, setPagination] = useState({
    pageSize: 20,
    showSizeChanger: true,
    current: 1,
    total: 0,
  });

  const { pageSize, current, total } = pagination;

  const [inboxList, setInboxList] = useState([]);
  const [accountList, setAccountList] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUser] = useState(false);

  const { loadingDepartments, departments } = useDepartments();

  const getUsers = async ({ departmentId = '' }) => {
    try {
      setLoadingUser(true);
      const response = await axios.get('/api/accounts', { department_id: departmentId });
      setAccountList(response?.data?.results);
      response?.data?.results?.length > 0 && setSelectedUserId(response?.data?.results[0].id);
    } catch (error) {
      console.error('Failed to fetch accounts', error);
    } finally {
      setLoadingUser(false);
    }
  };

  const getList = async ({ searchTerm = '', page = 1, page_size = 20, userId = '' } = {}) => {
    try {
      setLoading(true);
      const response = await axios.get('/api/inbox', {
        search_term: searchTerm,
        page,
        page_size,
        receiver_id: userId,
      });

      setInboxList(response?.data?.results);
      setPagination((prev) => ({
        ...prev,
        total: Number(response?.data?.count) || 0,
      }));
    } catch (error) {
      console.error('Failed to fetch inbox list', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers({ departmentId: selectedDepartmentId });
  }, [selectedDepartmentId]);

  useEffect(() => {
    getList({ searchTerm, page: current, page_size: pageSize, userId: selectedUserId });
  }, [selectedUserId, current, pageSize]);

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
    setSearchTerm('');
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
      value: item.id,
      label: item.email,
    }));

  const departmentsSelect = [
    { label: 'Tất cả', value: '' },
    ...departments.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', flexDirection: 'column' }}>
        {!loadingDepartments && (
          <>
            <span className="label mb-8">Chọn phòng ban</span>
            <Select
              popupClassName="dropdown-select"
              style={{ width: '100%', marginBottom: 20 }}
              placeholder="Chọn phòng ban"
              onChange={(value) => {
                setSelectedDepartmentId(value);

                setSelectedUserId('');
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

      <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', flexDirection: 'column' }}>
        {!loadingUsers && (
          <>
            <span className="label mb-8">Chọn tài khoản</span>
            <Select
              popupClassName="dropdown-select"
              style={{ width: '100%', marginBottom: 20 }}
              placeholder="Chọn tài khoản"
              onChange={(value) => {
                setSelectedUserId(value);

                handleReset();
              }}
              loading={loadingUsers}
              disabled={loadingUsers}
              defaultValue={selectedUserId}
              options={accountsSelect}
            />
          </>
        )}
      </div>

      {!loadingDepartments && (
        <Input
          style={{ width: '100%', marginBottom: 20, height: 40 }}
          placeholder="Tìm kiếm theo người gửi"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          onPressEnter={() => {
            getList({ searchTerm, page_size: pageSize, userId: selectedUserId });
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
        <>
          <Skeleton active />
          <Skeleton style={{ marginTop: 10 }} active />
          <Skeleton style={{ marginTop: 10 }} active />
        </>
      ) : (
        <>
          <EmailNav>
            <ul>
              {inboxList?.length > 0 ? (
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
                              title={`${item?.sender.name} <${item?.sender.email}>`}
                            >
                              {item?.sender.name} &lt;{item?.sender.email}&gt;
                            </Paragraph>
                          </div>
                          <span className="email-date">{item?.created_at}</span>
                        </div>
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Paragraph
                    style={{
                      textAlign: 'center',
                      padding: '10px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                    }}
                    className="empty"
                  >
                    No emails found
                  </Paragraph>
                </li>
              )}
            </ul>
          </EmailNav>
        </>
      )}
    </>
  );
});
