import UilInbox from '@iconscout/react-unicons/icons/uil-inbox';
import { Input, Pagination, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import Paragraph from 'antd/lib/typography/Paragraph';
import propTypes from 'prop-types';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import accountList from '../../../../../demoData/data-table.json';
import inboxList from '../../../../../demoData/emailData2.json';
import { EmailNav } from './style';

export const InboxList = React.memo(({ toggleCollapsed }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchTerm, setSearchTerm] = useState('');

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const sendersFilter = inboxList.filter((user) => user.from.toLowerCase().includes(searchTerm.toLowerCase()));

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = sendersFilter.slice(startIndex, endIndex);

  const users = accountList.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const handleChange = (value) => {
    console.log(`Selected user ID: ${value}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Select style={{ width: '100%', marginBottom: 20 }} placeholder="Chọn tài khoản" onChange={handleChange}>
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
        onChange={handleSearch}
      />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          onChange={handlePageChange}
          total={sendersFilter.length}
          showSizeChanger
        />
      </div>

      <EmailNav>
        <ul>
          {paginatedItems.length > 0 &&
            paginatedItems.map((item) => (
              <li key={item.id}>
                <NavLink to={`./inbox/${item.id}`} onClick={toggleCollapsed}>
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
                    <span style={{ whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 400, color: 'rgb(64, 64, 64)' }}>
                      {item?.date}
                    </span>
                  </span>
                </NavLink>
              </li>
            ))}
        </ul>
      </EmailNav>
    </>
  );
});

InboxList.propTypes = {
  toggleCollapsed: propTypes.func,
};