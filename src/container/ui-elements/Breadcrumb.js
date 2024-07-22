import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Menu, Row } from 'antd';
import { NavLink } from 'react-router-dom';
import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { Main } from '../styled';
import { BreadcrumbWrapperStyle } from './ui-elements-styled';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        General
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Layout
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Navigation
      </a>
    </Menu.Item>
  </Menu>
);

function Breadcrumbs() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Avatar',
    },
  ];
  return (
    <>
      <PageHeader className="invoice-page-header-main" title="Breadcrumb" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col md={12} sm={24} xs={24}>
            <Cards title="Basic">
              <BreadcrumbWrapperStyle>
                <Breadcrumb>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink to="#">Application Center</NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink to="#">Application List</NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbWrapperStyle>
            </Cards>
            <Cards title="Bread crumbs with drop down menu">
              <BreadcrumbWrapperStyle>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <NavLink to="#">Design</NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink to="#">Component</NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item menu={menu}>
                    <NavLink to="#">
                      <span>General</span>
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Button</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbWrapperStyle>
            </Cards>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <Cards title="With Icon">
              <BreadcrumbWrapperStyle>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <HomeOutlined />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink to="#">Application Center</NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink to="#">
                      <span>Application List</span>
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbWrapperStyle>
            </Cards>

            <Cards title="Configuring the Separator">
              <BreadcrumbWrapperStyle>
                <Breadcrumb separator=">">
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink to="#">Application Center</NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink to="#">Application List</NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbWrapperStyle>
            </Cards>

            <Cards title="Configuring the Separator">
              <BreadcrumbWrapperStyle>
                <Breadcrumb separator="">
                  <Breadcrumb.Item>Location</Breadcrumb.Item>
                  <Breadcrumb.Separator>:</Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <NavLink to="#">Application Center</NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <NavLink to="#">Application List</NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbWrapperStyle>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Breadcrumbs;
