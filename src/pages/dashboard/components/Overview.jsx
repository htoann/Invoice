import { Col, Row } from 'antd';
import React from 'react';

import OverviewCard from '@/components/cards/OverviewCard';
import OverviewData from '@/mock/demoData/overviewData.json';
import { OverviewDataStyleWrap } from '../Style';

const Overview = React.memo(() => {
  const OverviewDataSorted = OverviewData.slice(Math.max(OverviewData.length - 4, 1));

  return (
    <OverviewDataStyleWrap>
      <Row gutter={25}>
        {OverviewDataSorted.map((item, i) => {
          return (
            <Col xxl={6} sm={12} xs={24} key={i}>
              <OverviewCard data={item} contentFirst halfCircleIcon />
            </Col>
          );
        })}
      </Row>
    </OverviewDataStyleWrap>
  );
});

export default Overview;
