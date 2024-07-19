import { Col, Row } from 'antd';
import React from 'react';
import OverviewCard from '../../../components/cards/OverviewCard';
import { OverviewDataStyleWrap } from '../../dashboard/Style';

import SupportOverview from '../../../demoData/supportOverview.json';

const OverviewDataList = React.memo(() => {
  return (
    <OverviewDataStyleWrap>
      <Row gutter={25}>
        {SupportOverview.map((item, i) => {
          return (
            <Col xxl={6} sm={12} xs={24} key={i}>
              <OverviewCard className="invoice-overview-card-support" data={item} bottomStatus={false} contentFirst />
            </Col>
          );
        })}
      </Row>
    </OverviewDataStyleWrap>
  );
});

export default OverviewDataList;
