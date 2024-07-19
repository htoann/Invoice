import { Col, Row } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Tab } from '../../components/tabs/tabs';
import tabData from '@/mock/demoData/tab-data.json';
import { Main } from '../styled';

const { data, dataIcon, icon } = tabData;

function Tabs() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Tabs',
    },
  ];
  return (
    <>
      <PageHeader className="invoice-page-header-main" title="Tabs" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col md={12} xs={24}>
            <Tab data={data} />
          </Col>
          <Col md={12} xs={24}>
            <Tab data={data} color="default" />
          </Col>
        </Row>
        <Row gutter={15}>
          <Col md={12} xs={24}>
            <Tab data={dataIcon} type="primary" color="#FB3586" />
          </Col>
          <Col md={12} xs={24}>
            <Tab data={icon} type="primary" color="#FB3586" />
          </Col>
        </Row>
        <Row gutter={15}>
          <Col md={12} xs={24}>
            <Tab data={dataIcon} type="white" color="#ffffff" />
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Tabs;
