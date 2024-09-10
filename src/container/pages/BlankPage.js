import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers';
import { Col, Row } from 'antd';
import { Main } from '../styled';

function BlankPage() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Blank Page',
    },
  ];

  return (
    <>
      <PageHeader className="invoice-page-header-main" title="Blank Page" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              <h3>Skeleton Page</h3>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default BlankPage;
