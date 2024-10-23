import { Cards } from '@/components/card';
import { PageHeader } from '@/components/page-header';
import { Main } from '@/container/style';
import { Col, Row, Skeleton } from 'antd';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import BusinessStatus from './components/BusinessStatus';
import InvoicesChange from './components/InvoicesChange';
import Overview from './components/Overview';

function Dashboard() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_Overview')} />

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
              <Overview />
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
