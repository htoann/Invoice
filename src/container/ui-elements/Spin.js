import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Spin } from 'antd';
import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { Main } from '../styled';
import { SpinerWraperStyle } from './ui-elements-styled';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} />;

function Spinner() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Spin',
    },
  ];
  return (
    <>
      <PageHeader className="invoice-page-header-main" title="Spin" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col sm={12} xs={24}>
            <Cards title="Basic" caption="The simplest use of Spin">
              <Spin />
            </Cards>
          </Col>
          <Col sm={12} xs={24}>
            <Cards title="Size" caption="The simplest use of Spin">
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
            </Cards>
          </Col>
          <Col sm={12} xs={24}>
            <Cards title="Inside a container" caption="The simplest use of Spin">
              <SpinerWraperStyle>
                <Spin />
              </SpinerWraperStyle>
            </Cards>
          </Col>
          <Col sm={12} xs={24}>
            <Cards title="Custom Indicator" caption="The simplest use of Spin">
              <SpinerWraperStyle>
                <Spin indicator={antIcon} />
              </SpinerWraperStyle>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Spinner;
