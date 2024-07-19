import React, { useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { NewProductWrapper } from '../Style';
import { BorderLessHeading, TableDefaultStyle } from '../../styled';

import tableData from '@/mock/demoData/table-data.json';

const { newProduct } = tableData;

const productColumns = [
  {
    title: 'Product Name',
    dataIndex: 'pName',
    key: 'pName',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
];

const InvoicesChange = React.memo(() => {
  const [state, setState] = useState({
    productTab: 'today',
  });

  /* State destructuring */
  const { productTab } = state;

  const newProductData = [];
  if (newProduct !== null) {
    newProduct[productTab].map((value) => {
      const { key, name, img, price } = value;
      return newProductData.push({
        key,
        pName: (
          <div className="invoice-info-element align-center-v">
            <div className="invoice-info-element__media">
              <img src={require(`../../../static/img/products/electronics/${img}`)} alt="invoice Product" />
            </div>
            <div className="invoice-info-element__content">
              <span className="invoice-info-element__text">{name}</span>
            </div>
          </div>
        ),
        price: <span className="invoice-product-price">{price}</span>,
      });
    });
  }

  const handleTabActivation = (value, e) => {
    e.preventDefault();
    setState({
      ...state,
      productTab: value,
    });
  };

  return (
    <div className="full-width-table">
      <BorderLessHeading>
        <Cards
          isButton={
            <div className="invoice-card-nav">
              <ul>
                <li className={productTab === 'today' ? 'invoice-active' : 'invoice-today'}>
                  <Link onClick={(e) => handleTabActivation('today', e)} to="#">
                    Today
                  </Link>
                </li>
                <li className={productTab === 'week' ? 'invoice-active' : 'invoice-week'}>
                  <Link onClick={(e) => handleTabActivation('week', e)} to="#">
                    Week
                  </Link>
                </li>
                <li className={productTab === 'month' ? 'invoice-active' : 'invoice-month'}>
                  <Link onClick={(e) => handleTabActivation('month', e)} to="#">
                    Month
                  </Link>
                </li>
              </ul>
            </div>
          }
          title="Hóa đơn bị thay đổi bởi người bán - Nhà cung cấp"
          size="large"
        >
          <TableDefaultStyle className="invoice-having-header-bg">
            <NewProductWrapper>
              <div className="table-responsive">
                <Table columns={productColumns} dataSource={newProductData} pagination={false} />
              </div>
            </NewProductWrapper>
          </TableDefaultStyle>
        </Cards>
      </BorderLessHeading>
    </div>
  );
});

export default InvoicesChange;
