import { Col, Row, Skeleton } from 'antd';
import { Suspense } from 'react';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import BusinessStatus from './overview/BusinessStatus';
import InvoicesChange from './overview/InvoicesChange';
import OverviewDataList from './overview/OverviewDataList';

function Dashboard() {
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Tổng quan" />

      <Main>
        <Row justify="center">
          <Col xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <OverviewDataList />
            </Suspense>
          </Col>
        </Row>

        <Row justify="center" gutter={25}>
          <Col xxl={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <InvoicesChange />
            </Suspense>
          </Col>
          <Col xxl={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <BusinessStatus />
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Dashboard;
