import { Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cards } from '@/components/cards/frame/cards-frame';
import { BorderLessHeading, TableDefaultStyle } from '@/container/styled';
import tableData from '@/mock/demoData/table-data.json';
import { NewProductWrapper } from '../Style';

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
  const { t } = useTranslation();

  const newProductData = [];
  if (newProduct !== null) {
    newProduct.map((value) => {
      const { key, name, price } = value;
      return newProductData.push({
        key,
        pName: (
          <div className="invoice-info-element align-center-v">
            <div className="invoice-info-element__media">
              <img src={require(`@/static/img/placeholder.png`)} alt="Invoice Product" />
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

  return (
    <div className="full-width-table">
      <BorderLessHeading>
        <Cards title={t('Dashboard_InvoicesChange')} size="large">
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
