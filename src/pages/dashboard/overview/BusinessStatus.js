import { Cards } from '@/components/cards/frame/cards-frame';
import { BorderLessHeading, TableDefaultStyle } from '@/container/styled';
import tableData from '@/mock/demoData/table-data.json';
import { Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const bestSellerData = [];

  if (bestSeller !== null) {
    bestSeller.map((value) => {
      const { key, name, company, product, revenue, status } = value;
      return bestSellerData.push({
        key,
        sellerName: (
          <div className="invoice-info-element align-center-v">
            <div className="invoice-info-element__media">
              <img src={require(`@/static/img/placeholder.png`)} alt="Invoice Product" />
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

  return (
    <div className="full-width-table">
      <BorderLessHeading>
        <Cards title={t('Dashboard_BusinessStatus')} size="large">
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
