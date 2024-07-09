import { RightOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { BorderLessHeading, Main } from '../../../../container/styled';
import data from './mock.json';

export const CoCauToChuc = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    setSelectedDepartment(null);
  }, [selectedCompany]);

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Cơ cấu tổ chức" />
      <Main>
        <Row gutter={15}>
          <Col xs={8}>
            <BorderLessHeading>
              <Cards title="Công ty">
                <Menu
                  style={{ width: '100%' }}
                  mode="inline"
                  defaultSelectedKeys={[selectedCompany]}
                  onClick={({ key }) => setSelectedCompany(key)}
                  itemIcon={<RightOutlined />}
                >
                  {Object.keys(data.companies).map((company) => (
                    <Menu.Item key={company}>{company}</Menu.Item>
                  ))}
                </Menu>
              </Cards>
            </BorderLessHeading>
          </Col>
          {selectedCompany && (
            <Col xs={8}>
              <BorderLessHeading>
                <Cards title="Phòng ban">
                  <Menu
                    style={{ width: '100%' }}
                    mode="inline"
                    selectedKeys={[selectedDepartment]}
                    onClick={({ key }) => setSelectedDepartment(key)}
                    itemIcon={<RightOutlined />}
                  >
                    {data.companies[selectedCompany].map((department) => (
                      <Menu.Item key={department}>{department}</Menu.Item>
                    ))}
                  </Menu>
                </Cards>
              </BorderLessHeading>
            </Col>
          )}
          {selectedDepartment && (
            <Col xs={8}>
              <BorderLessHeading>
                <Cards title="Nhóm">
                  <Menu style={{ width: '100%' }} mode="inline">
                    {data.departments[selectedDepartment].map((team) => (
                      <Menu.Item key={team}>{team}</Menu.Item>
                    ))}
                  </Menu>
                </Cards>
              </BorderLessHeading>
            </Col>
          )}
        </Row>
      </Main>
    </>
  );
};
