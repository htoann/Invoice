import { ArrowDownOutlined, ArrowUpOutlined, LikeOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';

function Statistics() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Statistics',
    },
  ];

  return (
    <>
      <PageHeader className="invoice-page-header-main" title="Statistics" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col md={12} xs={24}>
            <Cards title="Basic" caption="The simplest use of Statistic">
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Active Users" value={112893} />
                </Col>
                <Col span={12}>
                  <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                  <Button style={{ marginTop: 16, fontSize: 14 }} size="large" type="primary" raised>
                    Recharge
                  </Button>
                </Col>
              </Row>
            </Cards>
            <Cards title="In Card" caption="The simplest use of Statistic">
              <Row gutter={15}>
                <Col md={12}>
                  <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#01B81A' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Col>
                <Col md={12}>
                  <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#FF0F0F' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Col>
              </Row>
            </Cards>
          </Col>
          <Col md={12} xs={24}>
            <Cards title="Unit" caption="The simplest use of Statistic">
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Unmerged" value={93} suffix="/ 100" />
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Statistics;
