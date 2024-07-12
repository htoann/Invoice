import axios from '@/pages/mails/mockApi';
import UilInbox from '@iconscout/react-unicons/icons/uil-inbox';
import { Input, Pagination, Select, Skeleton } from 'antd';
import { Option } from 'antd/lib/mentions';
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

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/accounts');
      setAccountList(response?.data?.results);
    } catch (error) {
      console.error('Failed to fetch accounts', error);
    } finally {
      setLoading(false);
    }
  };

  const getList = async ({ searchTerm = '', page = 1, page_size = 20, userId = '' } = {}) => {
    try {
      setLoading(true);
      const response = await axios.get('/api/inbox', {
        params: {
          searchTerm,
          page,
          page_size,
          userId,
        },
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
    getUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      getList({ searchTerm, page: current, page_size: pageSize, userId: selectedUserId });
    }
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

  const users =
    accountList?.length > 0
      ? accountList.map((item) => ({
          id: item.id,
          name: item.name,
        }))
      : [];

  return (
    <>
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
        loading={loading}
        disabled={loading}
      >
        {users.map((user) => (
          <Option key={user.id} value={user.id}>
            {user.name}
          </Option>
        ))}
      </Select>

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

      {loading ? (
        <Skeleton active />
      ) : (
        <>
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

          <EmailNav>
            <ul>
              {inboxList?.length > 0 ? (
                inboxList.map((item) => (
                  <li key={item.id}>
                    <Link
                      className={item?.id === selectedInbox?.id ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCollapsed && toggleCollapsed();
                        setSelectedInbox(item);
                      }}
                    >
                      <UilInbox />
                      <span className="nav-text" style={{ padding: '5px 0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
                          <Paragraph ellipsis style={{ width: '100%', fontWeight: 500, color: 'rgb(64, 64, 64)' }}>
                            {item?.subject}
                          </Paragraph>
                          <Paragraph ellipsis style={{ width: '100%', marginBottom: 0 }}>
                            {item?.from}
                          </Paragraph>
                        </div>
                        <span
                          style={{ whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 400, color: 'rgb(64, 64, 64)' }}
                        >
                          {item?.date}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Paragraph style={{ textAlign: 'center', padding: '10px 0' }}>No emails found</Paragraph>
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
