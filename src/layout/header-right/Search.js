import { UilSearch, UilTimes } from '@iconscout/react-unicons';
import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = React.memo(() => {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    openSearch: false,
  });

  const openSearchbar = (e) => {
    e.preventDefault();
    setState({
      ...state,
      openSearch: true,
    });
  };
  const closeSearchbar = (e) => {
    e.preventDefault();
    setState({
      ...state,
      openSearch: false,
    });
  };

  const { openSearch } = state;

  return (
    <div
      className={
        openSearch
          ? 'invoice-nav-actions__item invoice-nav-actions__searchbar show'
          : 'invoice-nav-actions__item invoice-nav-actions__searchbar'
      }
    >
      <div className="invoice-searchbar">
        <Form form={form} name="invoice-search">
          <Form.Item name="search-input">
            <Input placeholder="Search Here" />
          </Form.Item>
        </Form>
      </div>
      <Link to="/" onClick={(e) => openSearchbar(e)} className="invoice-search-icon">
        <UilSearch />
      </Link>
      <Link to="/" onClick={(e) => closeSearchbar(e)} className="invoice-close-icon">
        <UilTimes />
      </Link>
    </div>
  );
});

export default SearchBar;
