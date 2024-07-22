import { Table } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Cards } from '@/components/cards/frame/cards-frame';
import { BorderLessHeading, TableDefaultStyle } from '@/container/styled';
import tableData from '@/mock/demoData/table-data.json';

const { bestSeller } = tableData;

const sellerColumns = [
  {
    title: 'Seller Name',
    dataIndex: 'sellerName',
    key: 'sellerName',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    key: 'revenue',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const BusinessStatus = React.memo(() => {
  const [state, setState] = useState({
    sellerTab: 'today',
  });

  const { sellerTab } = state;

  const bestSellerData = [];

  if (bestSeller !== null) {
    bestSeller[sellerTab].map((value) => {
      const { key, name, company, product, revenue, status } = value;
      return bestSellerData.push({
        key,
        sellerName: (
          <div className="invoice-info-element align-center-v">
            <div className="invoice-info-element__media">
              <img src={require(`@/static/img/placeholder.png`)} alt="invoice Product" />
            </div>
            <div className="invoice-info-element__content">
              <span className="invoice-info-element__text">{name}</span>
            </div>
          </div>
        ),
        company,
        product,
        revenue,
        status,
      });
    });
  }

  const handleTabChange = (value, event) => {
    event.preventDefault();
    setState({
      ...state,
      sellerTab: value,
    });
  };

  return (
    <div className="full-width-table">
      <BorderLessHeading>
        <Cards
          isButton={
            <div className="invoice-card-nav">
              <ul>
                <li className={sellerTab === 'today' ? 'invoice-active' : 'invoice-today'}>
                  <Link onClick={(e) => handleTabChange('today', e)} to="#">
                    Today
                  </Link>
                </li>
                <li className={sellerTab === 'week' ? 'invoice-active' : 'invoice-week'}>
                  <Link onClick={(e) => handleTabChange('week', e)} to="#">
                    Week
                  </Link>
                </li>
                <li className={sellerTab === 'month' ? 'invoice-active' : 'invoice-month'}>
                  <Link onClick={(e) => handleTabChange('month', e)} to="#">
                    Month
                  </Link>
                </li>
              </ul>
            </div>
          }
          title="Trạng thái doanh nghiệp"
          size="large"
        >
          <TableDefaultStyle className="invoice-having-header-bg">
            <div className="table-responsive">
              <Table columns={sellerColumns} dataSource={bestSellerData} pagination={false} />
            </div>
          </TableDefaultStyle>
        </Cards>
      </BorderLessHeading>
    </div>
  );
});

export default BusinessStatus;
