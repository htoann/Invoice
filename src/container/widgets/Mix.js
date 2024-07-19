import { Col, Row } from 'antd';
import { lazy } from 'react';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import Ordersummary from '../ecommerce/overview/Ordersummary';
import { Main } from '../styled';
import { MixedCardWrap } from './Style';

const SocialMediaOverview = lazy(() => import('./overview/SocialMediaOverview'));
const DailyOverview = lazy(() => import('./overview/DailyOverview'));

function WidgetsCard() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Widgets Mixed',
    },
  ];
  return (
    <>
      <PageHeader className="invoice-page-header-main" title="Widgets Mixed" routes={PageRoutes} />
      <Main>
        <MixedCardWrap>
          <Row gutter={25}>
            <Col xxl={8} xl={10} xs={24}>
              <Cards headless>
                <Ordersummary subtotal={1200} />
              </Cards>
            </Col>
            <Col xxl={8} xs={24}>
              <SocialMediaOverview />
            </Col>
            <Col xxl={8} md={12} xs={24}>
              <DailyOverview />
            </Col>
          </Row>
        </MixedCardWrap>
      </Main>
    </>
  );
}

export default WidgetsCard;
