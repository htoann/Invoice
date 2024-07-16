import axios from '@/mock/index';
import UilInbox from '@iconscout/react-unicons/icons/uil-inbox';
import { Input, Pagination, Select, Skeleton, Tooltip } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailNav } from './style';

export const InboxList = React.memo(({ toggleCollapsed, setSelectedInbox, selectedInbox }) => {
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

  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUser] = useState(false);

  const getUsers = async () => {
    try {
      setLoadingUser(true);
      const response = await axios.get('/api/accounts');
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
        searchTerm,
        page,
        page_size,
        userId,
      });

      setInboxList(response?.data?.results);
      if (response?.data?.results?.length > 0) {
        setSelectedInbox(response?.data?.results[0]);
      }
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
    getUsers();
  }, []);

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

  const accountsSelect =
    accountList?.length > 0 &&
    accountList.map((item) => ({
      value: item.id,
      label: item.email,
    }));

  return (
    <>
      {!loadingUsers && (
        <Select
          style={{ width: '100%', marginBottom: 20 }}
          placeholder="Chọn tài khoản"
          onChange={(value) => {
            setSelectedUserId(value);
            setSearchTerm('');
            setPagination({
              pageSize: 20,
              showSizeChanger: true,
              current: 1,
              total: 0,
            });
          }}
          loading={loadingUsers}
          disabled={loadingUsers}
          defaultValue={selectedUserId}
          options={accountsSelect}
        />
      )}

      {inboxList?.length > 0 && (
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

      {loading || loadingUsers ? (
        <>
          <Skeleton active />
          <Skeleton style={{ marginTop: 10 }} active />
          <Skeleton style={{ marginTop: 10 }} active />
        </>
      ) : (
        <>
          {inboxList?.length > 0 && (
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

          <EmailNav>
            <ul>
              {inboxList?.length > 0 ? (
                inboxList.map((item) => (
                  <li key={item.id} style={{ marginBottom: 5 }}>
                    <Link
                      className={item?.id === selectedInbox?.id ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCollapsed && toggleCollapsed();
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
                            <Tooltip title={`${item?.sender.name} <${item?.sender.email}>`}>
                              <Paragraph
                                className="email-sender"
                                ellipsis
                                style={{
                                  width: '100%',
                                  marginBottom: 0,
                                  lineHeight: '1.2rem',
                                }}
                              >
                                {item?.sender.name} &lt;{item?.sender.email}&gt;
                              </Paragraph>
                            </Tooltip>
                          </div>
                          <span className="email-date">{item?.date}</span>
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

InboxList.propTypes = {
  toggleCollapsed: propTypes.func,
};
